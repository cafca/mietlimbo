// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import {blue500} from 'material-ui/styles/colors';

import type { AssistantInputProps } from '../Types';

type SquareMetersProps = AssistantInputProps & {
  exact?: string,
  guessed?: string
};

class SquareMetersInput extends React.Component {
	state: {
		value: string,
		errors: ?Array<any>
	}

	inputName: string = "squareMeters";

	constructor(props: SquareMetersProps) {
		super(props);
		autoBind(this);
		this.state = {
			value: props.exact === undefined ? "" : props.exact,
			errors: null
		};
	}

	handleChange(e: SyntheticInputEvent, value:string) {
		const errors = [];
		const intValue = parseFloat(value, 10);

		if (isNaN(intValue)) {
			errors.push(<FormattedMessage 
				id="Spanneneinordnung.squareMetersError"
        key="Spanneneinordnung.squareMetersError"
				defaultMessage="Bitte gib hier eine Quadratmeterzahl ein. Du findest die Fläche in deinem Mietvertrag." />);
			this.props.valid(this.inputName, false);
    } else if (value.indexOf(",") > -1) {
      errors.push(<FormattedMessage
        id="Spanneneinordnung.errorDecSeparator"
        key="Spanneneinordnung.errorDecSeparator"
        defaultMessage="Bitte benutze einen Punkt, um Nachkommastellen zu trennen. Also z.B. '80.8'."
        />);
		} else {
			this.props.changed({
        [this.inputName]: intValue,
      });
			// don't save date while user is typing
			if (intValue > 10) this.props.valid(this.inputName, true);
      this.props.valid("mietspiegel", false);
		}

		this.setState({
			value,
			errors: (errors.length > 0 ? errors : null)
		})
	}

	render() {
    const messages = defineMessages({
      title: {
        id: "SquareMeters.title",
        defaultMessage: "Wieviele Quadratmeter hat die Wohnung?"
      },
      description: {
        id: "SquareMeters.description",
        defaultMessage: `Mit diesem Wert wird nicht nur aus dem Quadratmeterpreis die
        Gesamtmiete berechnet, sondern auch die örtliche Vergleichsmiete ändert sich,
        je nachdem wie groß eine Wohnung ist.`
      },
      hint: {
        id: "SquareMeters.textBoxHint",
        defaultMessage: "Wohnfläche in Quadratmeter"
      },
      explanation: {
        id: "SquareMeters.hint",
        defaultMessage: `Du kannst auch erstmal schätzen, wenn du es nicht genau weißt. 
          Denk dann später daran, den genauen Wert in deinem Mietvertrag nachzuschlagen.`
      }
    });

		return <Card className="assistantInput" id={this.inputName}>
      <CardTitle 
        title={this.props.intl.formatMessage(messages.title)} 
        actAsExpander={true}
        showExpandableButton={true} 
        closeIcon={<HelpIcon color={blue500} />}
      />
      <CardText expandable={true}>
        <p><FormattedMessage {...messages.explanation} /></p>
      </CardText>
      <CardText>
        <p>
          <FormattedMessage {...messages.description} />
        </p>
        <TextField
          name={this.inputName}
          hintText={this.props.intl.formatMessage(messages.hint)}
          value={this.state.value}
          onChange={this.handleChange}
          errorText={this.state.errors} />
      </CardText>
		</Card>;
	}
}

export default injectIntl(SquareMetersInput);