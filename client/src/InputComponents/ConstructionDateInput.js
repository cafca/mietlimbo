// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages} from 'react-intl';

import {ErrorList} from '../Assistant/Assistant';
import {AssistantInputProps} from './Tools';

class ConstructionDateInput extends React.Component {
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

	constructor(props: AssistantInputProps) {
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

				const intValue = parseInt(e.target.value, 10);

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
		const radioControls = this.radioOptions.map((rangeName, i) => <div key={"constructionDateOption-" + i}>
				<input
					id={"constructionDateGuessed" + rangeName}
					name="constructionDateGuessed"
					type="radio"
					value={rangeName}
					checked={this.state.guessedValue === rangeName}
					onChange={this.handleChange} />
				<FormattedMessage
					{...this.radioDescriptions[rangeName]} />
			</div>)

		return <div className="assistantInput">
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

export default ConstructionDateInput;