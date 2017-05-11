// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages} from 'react-intl';

import {ErrorList} from './Assistant';

// NewBuildingInput, 
// ConstructionDateInput, 
// SquareMeterInput, 
// SpecialFeaturesInput

type Props = {
	changed: (string, string) => mixed, 
	valid: (string, boolean) => mixed
};

export class NewBuildingInput extends React.Component {
	state: {
		value: boolean
	};

	inputName: string = "newBuilding";

	constructor(props: Props) {
		super(props);
		this.state = {
			value: false,
		}
		autoBind(this);
	}

	handleChange(e: SyntheticInputEvent) {
		const value = e.target.value === "newBuildingTrue";
		this.props.changed(this.inputName, value);
		this.setState({value});
	}

	componentDidMount() {
		this.props.valid(this.inputName, true);
	}

	render() {
		return <div>
			<p><label htmlFor={this.inputName}>
				<FormattedMessage 
					id="Spanneneinordnung.newBuilding"
					defaultMessage="Wohnst du in einem Neubau und bist Erstmieter?" />
			</label></p>

			<div>
				<input
				id="newBuildingTrue"
				name={this.inputName}
				type="radio"
				value="newBuildingTrue"
				checked={this.state.value === true}
				onChange={this.handleChange} /> 
				<FormattedMessage
					id="Spanneneinordnung.newBuildingTrue" 
					defaultMessage="Ja, das Haus wurde nach 1.10.2014 zuerst vermietet." />
			</div>

			<div>
				<input
					id="newBuildingFalse"
					name={this.inputName}
					type="radio"
					value="newBuildingFalse"
					checked={this.state.value === false}
					onChange={this.handleChange} /> 
				<FormattedMessage
					id="Spanneneinordnung.newBuildingFalse"
					defaultMessage="Nein, das Haus ist entweder älter oder es gab schon vor mir Mieter." />
			</div>
		</div>;
	}
}

export class ConstructionDateInput extends React.Component {
	state: {
		exactValue: string,
		guessedValue: string,
		errors: Array<any>
	}

	inputName: string = "constructionDate";

	radioOptions: Array<string> = [
		"Pre1918",
		"Pre1949", 
		"Pre1964", 
		"Pre1972", 
		"Pre1990", 
		"Pre2002", 
		"Pre2013", 
	];

	radioDescriptions = defineMessages({
		Pre1918: {
			id: "Spanneneinordnung.constructionDateGuessedPre1918",
			defaultMessage: "bezugsfertig bis 1918"
		},
		Pre1949: {
			id: "Spanneneinordnung.constructionDateGuessedPre1949",
			defaultMessage: "1919 - 1949"
		}, 
		Pre1964: {
			id: "Spanneneinordnung.constructionDateGuessedPre1964",
			defaultMessage: "1950 - 1964"
		}, 
		Pre1972: {
			id: "Spanneneinordnung.constructionDateGuessedPre1972",
			defaultMessage: "1965 - 1972"
		}, 
		Pre1990: {
			id: "Spanneneinordnung.constructionDateGuessedPre1990",
			defaultMessage: "1973 - 1990"
		}, 
		Pre2002: {
			id: "Spanneneinordnung.constructionDateGuessedPre2002",
			defaultMessage: "1991 - 2002"
		}, 
		Pre2013: {
			id: "Spanneneinordnung.constructionDateGuessedPre2013",
			defaultMessage: "2003 - 31.12.2013"
		} 
	});

	constructor(props: Props) {
		super(props);
		autoBind(this);
		this.state = {
			exactValue: "",
			guessedValue: "",
			errors: []
		};
	}

	handleChange(e: SyntheticInputEvent) {
		const errors = [];
		switch (e.target.name) {
			case "constructionDateGuessed":
				this.setState({
					exactValue: "",
					guessedValue: e.target.value,
					errors
				})
				this.props.changed("constructionDateGuessed", e.target.value);
				this.props.valid("constructionDate", true);
				break;

			default:
				// direct input

				const intValue = parseInt(e.target.value);

				if (isNaN(intValue)) {
					errors.push(<FormattedMessage 
						id="Spanneneinordnung.constructionDateError"
						defaultMessage="Bitte gib hier eine Jahreszahl ein oder schätze das Baudatum unten." />);
					this.props.valid("constructionDate", false);
				} else {
					this.props.changed(this.inputName, intValue);
					// don't save date while user is typing
					if (intValue > 1000) this.props.valid("constructionDate", true);
				}

				this.setState({
					exactValue: e.target.value,
					guessedValue: "",
					errors
				})
		}
	}

	render() {
		const radioControls = this.radioOptions.map((rangeName, i) => <div key={"radioControl-" + i}>
				<input
					id={"constructionDateGuessed" + rangeName[0]}
					name="constructionDateGuessed"
					type="radio"
					value={rangeName[0]}
					checked={this.state.guessedValue === rangeName[0]}
					onChange={this.handleChange} />
				<FormattedMessage
					{...this.radioDescriptions[rangeName]} />
			</div>)

		return <div>
			<label htmlFor={this.inputName}>
				<FormattedMessage 
					id="Spanneneinordnung.constructionDate"
					defaultMessage="Weißt du, in welchem Jahr das Haus gebaut wurde?" />
			</label>
			<input 
				id={this.inputName}
				name={this.inputName}
				className="textInput"
				type="text"
				value={this.state.exactValue} 
				onChange={this.handleChange} />
			<ErrorList errors={this.state.errors} />

			<div>
				<p><label htmlFor="constructionDateGuessed"><FormattedMessage
					id="Spanneneinordnung.constructionDateGuessed"
					defaultMessage="Nein, aber ich würde schätzen:" /></label></p>

				{radioControls}
			</div>
		</div>;
	}
}