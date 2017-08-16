// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {ErrorList} from './Tools';
import type {AssistantInputProps} from './Tools';

class RentInput extends React.Component {
  state: {
    value: string,
    errors: Array<any>
  }

  inputName: string = "rent";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      value: props.value === undefined ? "" : props.value,
      errors: []
    }
  }

  componentDidMount() {
    if (this.props.value !== undefined) this.props.valid(this.inputName, true);
  }

  handleChange(e: SyntheticInputEvent) {
    const fValue = parseFloat(e.target.value);
    const errors = [];

    if(isNaN(fValue)) {
      errors.push(<FormattedMessage 
        id="RentInput.errorNotANumber" 
        defaultMessage="Bitte gib deine Kaltmiete als Zahl an." />);
    } else if (fValue < 1) {
      errors.push(<FormattedMessage 
        id="RentInput.errorRentTooLow" 
        defaultMessage="Das ist zu wenig. Bitte gib deine Kaltmiete an." />);
    } else if (e.target.value.indexOf(",") > -1) {
      errors.push(<FormattedMessage
        id="RentInput.errorDecSeparator"
        defaultMessage="Bitte benutze einen Punkt, um Nachkommastellen zu trennen. Also z.B. '460.80'."
        />);
    } else {
      this.props.changed({[this.inputName]: fValue});
    }

    // input is valid if no errors encountered
    this.props.valid(this.inputName, errors.length === 0);
    this.setState({value: e.target.value, errors});
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "RentInput.title",
        defaultMessage: "Wieviel Kaltmiete bezahlst du jetzt?"
      },
      inputHint: {
        id: "RentInput.hint",
        defaultMessage: "Zum Beispiel: 460.80"
      }
    });

    const errors = this.state.errors.length === 0 ? null : <ErrorList errors={this.state.errors} />;

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage
          id="RentInput.description"
          defaultMessage="In diesem Betrag sind keine Heizkosten oder Nebenkosten enthalten." />
        </p>
        <TextField 
          id={this.inputName}
          name={this.inputName}
          hintText={this.props.intl.formatMessage(messages.inputHint)}
          errorText={errors}
          className="textInput"
          value={this.state.value}
          onChange={this.handleChange} />
      </CardText>
    </Card>;
  }
}

export default injectIntl(RentInput);