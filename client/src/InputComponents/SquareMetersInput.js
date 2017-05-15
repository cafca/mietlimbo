// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages} from 'react-intl';

import {AssistantInputProps, ErrorList} from './Tools';

class SquareMetersInput extends React.Component {
	state: {
		exactValue: string,
		guessedValue: string,
		errors: Array<any>
	}

	inputName: string = "squareMeters";
  inputNameAlt: string = "squareMetersGuessed";

	radioOptions: Array<string> = [
		"lt40",
		"lt60", 
		"lt90", 
		"gt90",
	];

	radioDescriptions = defineMessages({
		lt40: {
			id: "Spanneneinordnung.squareMetersGuessedLt40",
			defaultMessage: "unter 40 m²"
		},
		lt60: {
			id: "Spanneneinordnung.squareMetersGuessedLt60",
			defaultMessage: "40 bis unter 60 m²"
		}, 
		lt90: {
			id: "Spanneneinordnung.squareMetersGuessedLt90",
			defaultMessage: "60 bis unter 90 m²"
		}, 
		gt90: {
			id: "Spanneneinordnung.squareMetersGuessedGt90",
			defaultMessage: "90 m² und mehr"
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
			case this.inputNameAlt:
				this.setState({
					exactValue: "",
					guessedValue: e.target.value,
					errors
				})
        this.props.changed({
          [this.inputName]: null,
          [this.inputNameAlt]: e.target.value
        });
				this.props.valid(this.inputName, true);
				break;

			default:
				// direct input

				const intValue = parseInt(e.target.value, 10);

				if (isNaN(intValue)) {
					errors.push(<FormattedMessage 
						id="Spanneneinordnung.squareMetersError"
						defaultMessage="Bitte gib hier eine Quadratmeterzahl ein oder schätze die Grundfläche der Wohnung unten." />);
					this.props.valid(this.inputName, false);
				} else {
					this.props.changed({
            [this.inputName]: intValue,
            [this.inputNameAlt]: null
          });
					// don't save date while user is typing
					if (intValue > 10) this.props.valid(this.inputName, true);
				}

				this.setState({
					exactValue: e.target.value,
					guessedValue: "",
					errors
				})
		}
	}

	render() {
		const radioControls = this.radioOptions.map((rangeName, i) => <div key={"squareMetersOption-" + i}>
				<input
					id={this.inputNameAlt + rangeName}
					name={this.inputNameAlt}
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
					id="Spanneneinordnung.squareMeters"
					defaultMessage="Wieviele Quadratmeter hat die Wohnung?" />
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
				<p>
          <label htmlFor={this.inputNameAlt}>
            <FormattedMessage
					   id="Spanneneinordnung.squareMetersGuessed"
					   defaultMessage="Weiß ich nicht, aber ich glaube:" />
          </label>
				  {radioControls}
        </p>
			</div>
		</div>;
	}
}

export default SquareMetersInput;