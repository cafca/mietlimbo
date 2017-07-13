// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {injectIntl, defineMessages} from 'react-intl';
import areIntlLocalesSupported from 'intl-locales-supported';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';

import {ErrorList} from './Tools';
import type {AssistantInputProps} from './Tools';

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
let DateTimeFormat
if (areIntlLocalesSupported(['de'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/de');
}

class LeaseCreatedInput extends React.Component {
  state: {
    value: ?Date,
    errors: Array<any>
  };

  inputName = "leaseCreated";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);

    const initialDate = props.value === undefined ? null
      : new Date(props.value);
    this.state = {
      value: initialDate,
      errors: []
    }
  }

  handleChange(e, value) {
    const errors = [];
    this.props.changed({[this.inputName]: value});
    this.setState({errors, value});
    this.props.valid(this.inputName, true);
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "LeaseCreatedInput.title",
        defaultMessage: "Wann wurde dein Mietvertrag abgeschlossen?"
      },
      inputLabel: {
        id: "LeaseCreatedInput.inputLabel",
        defaultMessage: "Vertragsabschluss"
      },
      ok: {
        id: "LeaseCreatedInput.confirm",
        defaultMessage: "Ja"
      },
      cancel: {
        id: "LeaseCreatedInput.cancel",
        defaultMessage: "Doch nicht"
      }
    });

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p>Bitte gib hier das Vertragsdatum an.</p>
        <p><em>Tip: Gleich oben auf die Jahreszahl klicken um zu einem anderen Jahr zu springen.</em></p>
        <DatePicker 
          id={this.inputName}
          name={this.inputName} 
          hintText={this.props.intl.formatMessage(messages.inputLabel)}
          className="textInput"
          DateTimeFormat={DateTimeFormat}
          locale={"de"}
          okLabel={this.props.intl.formatMessage(messages.ok)}
          cancelLabel={this.props.intl.formatMessage(messages.cancel)}
          value={this.state.value}
          onChange={this.handleChange} />
        <ErrorList errors={this.state.errors} />
      </CardText>
    </Card>;
  }
}

export default injectIntl(LeaseCreatedInput);