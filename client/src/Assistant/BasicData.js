import React from 'react';
import autoBind from 'react-autobind';
import Autocomplete from 'react-google-autocomplete';
import {FormattedMessage} from 'react-intl';

const ErrorList = (props: {errors: [string]}) => {
	const el = props.errors.map(
		(e, i) => <p key={i} className="errorDesc">{e}</p>
	);
	return <span>{el}</span>;
}


class BasicData extends React.Component {
	constructor(props: Object) {
		super(props);
		this.state = {
			leaseCreated: "",
			leaseCreatedErrors: [],
			address: "",
			place: undefined,
			addressErrors: [],
			rent: "",
			rentErrors: [],
		}
		autoBind(this);
	}

	componentWillMount() {
		this.props.formValid(this.formIsValid())
	}

	componentWillUpdate() {
		this.props.formValid(this.formIsValid())
	}

	handleChange(e: Event) {
		const field = e.target.name;
		const leaseCreatedErrors = [];
		const rentErrors = [];

		switch(field) {
			case "leaseCreated":
				const leaseCreated = e.target.value;
				if (isNaN(Date.parse(leaseCreated))) {
					leaseCreatedErrors.push(<FormattedMessage 
						id="BasicData.leaseCreatedError" 
						defaultMessage="Bitte gib hier ein Datum im Format dd.mm.yyy an, also z.B. 15.01.2016." />)
				} else {
					this.props.save({leaseCreated});
				}
				this.setState({leaseCreatedErrors, leaseCreated})
				break;

			case "address":
				// handled in handleAddressChange
				break;

			case "rent":
				const rentFloat = parseFloat(e.target.value);
				if (isNaN(rentFloat)) {
					rentErrors.push(<FormattedMessage 
						id="BasicData.rentNotANumber" 
						defaultMessage="Bitte gib deine Kaltmiete als Zahl an, z.B. 460.80." />)
				} else if (rentFloat < 1) {
					rentErrors.push(<FormattedMessage 
						id="BasicData.rentTooLow" 
						defaultMessage="Das ist zu wenig. Bitte gib deine Kaltmiete an." />)
				} else {
					this.props.save({rent: rentFloat});
				}
				this.setState({rentErrors, rent: rentFloat})
				break;

			default:
				break;
		}
		this.setState({[field]: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("Submitted", this.state)
		this.props.continue();
	}

	formIsValid() {
		return (this.state.addressErrors.length === 0
			&& !isNaN(Date.parse(this.state.leaseCreated))
			&& !isNaN(parseInt(this.state.rent, 10)) && parseInt(this.state.rent, 10) > 0);
	}

	placeInBerlin(place: {address_components: [{types: [string], long_name: string}]}) {
		const berlinCriterium = val => (
			val.types[0] === "administrative_area_level_1" 
			&& val.long_name === "Berlin");

		return place.address_components.reduce(
			(prev, cur) => (berlinCriterium(cur) ? true : prev), false)
	}

	placeHasHouseNumber(place) {
		const numberCriterium = val => val.types[0] === "street_number";

		return place.address_components.reduce(
			(prev, cur) => (numberCriterium(cur) ? true : prev), false)
	}

	handleAdressChange(place: object) {
		var addressErrors = [];
		const address = place.formatted_address;
		console.log(place);
		if(!this.placeInBerlin(place)) {
			addressErrors.push(<FormattedMessage 
				id='BasicData.errorNotBerlin' 
				defaultMessage="Bitte wähle einen Ort in Berlin" />)
		} else if(!this.placeHasHouseNumber(place)) {
			addressErrors.push(<FormattedMessage 
				id='BasicData.errorNoNumber' 
				defaultMessage="Bitte gib eine Hausnummer ein." />)
		} else {
			this.props.save({address, addressPlace: place});
		}
		this.setState({place, addressErrors, address});
	}

	mapEmbedGen() {
		if (this.state.place !== undefined) {
			const apiKey = "AIzaSyDKLCOzvFpy3sr4Gc3YGHttdVB5wSnu78M";
			const srcUrl = "https://www.google.com/maps/embed/v1/place?key=" 
				+ apiKey + "&q=place_id:" + this.state.place.place_id;

			return <div className="mapEmbed">
				<ErrorList errors={this.state.addressErrors} />
				<iframe
				  width="95%"
				  height="300"
				  frameBorder="0" style={{border: 0}}
				  src={srcUrl}>
				</iframe>
				</div>;
		} 
	}

	render () {
	return <form onSubmit={this.handleSubmit}>
		<p>
			<label htmlFor="leaseCreated">
				<FormattedMessage 
					id="BasicData.leaseCreated" 
					defaultMessage="Wann wurde dein Mietvertrag abgeschlossen?" />
			</label>
			<input 
				id="leaseCreated"
				name="leaseCreated"
				type="date"
				value={this.state.leaseCreated} 
				onChange={this.handleChange} />
			<ErrorList errors={this.state.leaseCreatedErrors} />
		</p>
		<p>
			<label htmlFor="rent">
				<FormattedMessage 
					id="BasicData.rent" 
					defaultMessage="Wieviel Kaltmiete bezahlst du jetzt (in Euro, z.B. 480.20)?" />
			</label>
			<input
				id="rent"
				name="rent"
				type="text"
				value={this.state.rent}
				onChange={this.handleChange} />
			<ErrorList errors={this.state.rentErrors} />
		</p>
		<p>
			<label htmlFor="address">
				<FormattedMessage 
					id="BasicData.address" 
					defaultMessage="Wie lautet deine Adresse?" />
			</label>
			<Autocomplete
				id="address"
		    onPlaceSelected={this.handleAdressChange}
		    types={['address']}
		    componentRestrictions={{country: "de"}} />
			{this.mapEmbedGen()}
		</p>
	</form>;
	}
}

export default BasicData;