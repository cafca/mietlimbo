// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import type {AssistantInputProps} from './Tools';

type SquareMetersProps = AssistantInputProps & {
  exact: ?string,
  guessed: ?string
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
				defaultMessage="Bitte gib hier eine Quadratmeterzahl ein. Du findest die Fläche in deinem Mietvertrag." />);
			this.props.valid(this.inputName, false);
		} else {
			this.props.changed({
        [this.inputName]: intValue,
      });
			// don't save date while user is typing
			if (intValue > 10) this.props.valid(this.inputName, true);
		}

		this.setState({
			value,
			errors: (errors.length > 0 ? errors : null)
		})
	}

	render() {
    const messages = defineMessages({
      title: {
        id: "Spanneneinordnung.squareMeters",
        defaultMessage: "Wieviele Quadratmeter hat die Wohnung?"
      }
    });

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage 
          id="SquareMeters.hint"
          defaultMessage="Du kannst auch erstmal schätzen, wenn du es nicht genau weißt. Denk dann später daran, den genauen Wert in deinem Mietvertrag nachzuschlagen." /></p>
        <TextField
          name={this.inputName}
          value={this.state.value}
          onChange={this.handleChange}
          errorText={this.state.errors} />
      </CardText>
		</Card>;
	}
}

export default injectIntl(SquareMetersInput);