// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import {ErrorList} from './Tools';
import type {AssistantInputProps} from './Tools';

class SquareMetersInput extends React.Component {
	state: {
		exactValue: string,
		guessedValue: ?string,
		errors: ?Array<any>
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
			guessedValue: null,
			errors: null
		};
	}

	handleChange(e: SyntheticInputEvent, value:string) {
		const errors = [];
		switch (e.target.name) {
			case this.inputNameAlt:
				this.setState({
					exactValue: "",
					guessedValue: value,
					errors: null
				})
        this.props.changed({
          [this.inputName]: null,
          [this.inputNameAlt]: value
        });
				this.props.valid(this.inputName, true);
				break;

			default:
				// direct input
				const intValue = parseInt(value, 10);

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
					exactValue: value,
					guessedValue: null,
					errors: (errors.length > 0 ? errors : null)
				})
		}
	}

	render() {
		const radioControls = this.radioOptions.map((rangeName, i) => 
			<RadioButton
        key={"squareMetersOption-" + i}
				value={rangeName}
				label={this.props.intl.formatMessage(this.radioDescriptions[rangeName])} />);

    const messages = defineMessages({
      title: {
        id: "Spanneneinordnung.squareMeters",
        defaultMessage: "Wieviele Quadratmeter hat die Wohnung?"
      }
    });

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <TextField
          name={this.inputName}
          value={this.state.exactValue}
          onChange={this.handleChange}
          errorText={this.state.errors} />

  			<div>
            <label htmlFor={this.inputNameAlt}>
              <FormattedMessage
  					   id="Spanneneinordnung.squareMetersGuessed"
  					   defaultMessage="Weiß ich nicht, aber ich glaube:" />
            </label>
            <RadioButtonGroup
              name={this.inputNameAlt}
              onChange={this.handleChange}
              value={this.state.guessedValue} >
  				    {radioControls}
            </RadioButtonGroup>
  			</div>
      </CardText>
		</Card>;
	}
}

export default injectIntl(SquareMetersInput);