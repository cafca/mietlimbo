// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import {
  ErrorList
} from './Tools';

import type {AssistantInputProps} from './Tools';

class ConstructionDateInput extends React.Component {
	state: {
		exactValue: string,
		guessedValue: ?string,
		errors: ?Array<any>
	}

  style = {
    guessedContainer: {
      marginTop: "1em"
    }
  };

	inputName: string = "constructionDate";
  inputNameAlt: string = "constructionDateGuessed";

	radioOptions: Array<string> = [
    "Pre1918",
    "Pre1949", 
    "Pre1964", 
    "Pre1972", 
    "Pre1990", 
    "Pre2002", 
    "Pre2013"
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
			guessedValue: null,
			errors: null
		};
	}

	handleChange(e: SyntheticInputEvent, value: string) {
		const errors = [];
		switch (e.target.name) {
			case "constructionDateGuessed":
				this.setState({
					exactValue: "",
					guessedValue: value,
					errors: null
				})
        this.props.changed({
          [this.inputName]: null,
          [this.inputNameAlt]: value
        });
				this.props.valid("constructionDate", true);
				break;

			default:
				// direct input
				const intValue = parseInt(value, 10);

				if (isNaN(intValue)) {
					errors.push(<FormattedMessage 
						id="Spanneneinordnung.constructionDateError"
            key="Spanneneinordnung.constructionDateError"
						defaultMessage="Bitte gib hier eine Jahreszahl ein oder schätze das Baudatum unten." />);
					this.props.valid("constructionDate", false);
        } else if (intValue > 21 && intValue < 100) {
          errors.push(<FormattedMessage 
            id="Spanneneinordnung.constructionDateFormatError"
            key="Spanneneinordnung.constructionDateFormatError"
            defaultMessage="Bitte gib die vollständige Jahreszahl an (zum Beispiel 1950)." />);
          this.props.valid("constructionDate", false);
				} else {
					this.props.changed({
            [this.inputName]: intValue,
            [this.inputNameAlt]: null
          });
					// don't save date while user is typing
					if (intValue > 500) this.props.valid("constructionDate", true);
				}

        // TODO: This should set the RadioButtonGroup value to null, but doesn't.
				this.setState({
					exactValue: value,
					guessedValue: null,
					errors: (errors.length > 0 ? errors : null)
				})
		}
	}

	render() {
    const messages = defineMessages({
      title: {
        id: "Spanneneinordnung.constructionDate",
        defaultMessage: "Wann wurde das Haus gebaut?"
      }
    });

		const radioControls = this.radioOptions.map((rangeName, i) => <RadioButton
      key={"constructionDateOption-" + i}
			value={rangeName}
      label={this.props.intl.formatMessage(this.radioDescriptions[rangeName])} />)

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <TextField
          name={this.inputName}
          value={this.state.exactValue}
          onChange={this.handleChange} 
          errorText={this.state.errors} />

  			<div style={this.style.guessedContainer}>
          <label htmlFor={this.inputNameAlt} >
            <FormattedMessage
  					id="Spanneneinordnung.constructionDateGuessed"
  					defaultMessage="Das weiß ich nicht, aber ich würde schätzen:" />
          </label>
          <RadioButtonGroup 
            name={this.inputNameAlt}
            onChange={this.handleChange}
            valueSelected={this.state.guessedValue} >
            {radioControls}
          </RadioButtonGroup>
  			</div>
      </CardText>
		</Card>;
	}
}

export default injectIntl(ConstructionDateInput);