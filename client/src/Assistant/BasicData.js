import React from 'react';
import autoBind from 'react-autobind';
import Autocomplete from 'react-google-autocomplete';
import {FormattedMessage} from 'react-intl';


class BasicData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leaseCreated: new Date(),
			address: "",
			place: undefined,
			addressError: []
		}
		autoBind(this);
	}

	handleChange(e) {
		const field = e.target.name;
		this.setState({[field]: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("Submitted", this.state)
	}

	placeInBerlin(place: {address_components: [{types: [string], long_name: string}]}) {
		const berlinCriterium = val => (
			val.types[0] === "administrative_area_level_1" 
			&& val.long_name === "Berlin");

		return place.address_components.reduce(
			(prev, cur) => (berlinCriterium(cur) ? true : prev), 
			false)
	}

	placeHasHouseNumber(place) {
		const numberCriterium = val => val.types[0] === "street_number";

		return place.address_components.reduce(
			(prev, cur) => (numberCriterium(cur) ? true : prev), 
			false)
	}

	handleAdressChange(place: object) {
		var addressError = [];
		console.log(place);
		if(!this.placeInBerlin(place)) {
			addressError.push(<FormattedMessage id='BasicData.errorNotBerlin' defaultMessage="Bitte wähle einen Ort in Berlin" />)
		}
		if(!this.placeHasHouseNumber(place)) {
			addressError.push(<FormattedMessage id='BasicData.errorNoNumber' defaultMessage="Bitte gib eine Hausnummer ein." />)
		}
		const address = place.formatted_address;
		this.setState({place: place, addressError, address});
	}

	mapEmbedGen() {
		if (this.state.place !== undefined) {
			const apiKey = "AIzaSyDKLCOzvFpy3sr4Gc3YGHttdVB5wSnu78M";
			const srcUrl = "https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=place_id:" + this.state.place.place_id;
			const errors = this.state.addressError.map(e => <p className="errorDesc">{e}</p>);
			return <div className="mapEmbed">
				{errors}
				<iframe
				  width="600"
				  height="450"
				  frameBorder="0" style={{border: 0}}
				  src={srcUrl}>
				</iframe>
				</div>;
		} 
	}

	render () {
	return <form onSubmit={this.handleSubmit}>
		<p><label>
			<FormattedMessage id="BasicData.leaseCreated" defaultMessage="Vertragsabschluss" />
			<input 
				name="leaseCreated"
				type="date"
				value={this.state.leaseCreated} 
				onChange={this.handleChange} 
			/>
		</label></p>
		<p><label>
			<FormattedMessage id="BasicData.address" defaultMessage="Address" />
			<Autocomplete
			    onPlaceSelected={this.handleAdressChange}
			    types={['address']}
			    componentRestrictions={{country: "de"}}
			/>
			{this.mapEmbedGen()}
		</label></p>
	</form>;
	}
}

export default BasicData;