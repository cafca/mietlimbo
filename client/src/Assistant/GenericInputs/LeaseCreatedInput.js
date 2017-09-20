// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import areIntlLocalesSupported from 'intl-locales-supported';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';

import type { AssistantInputProps } from '../Types';

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
    value: ?Date
  };

  inputName = "leaseCreated";
  // Month is 0-indexed
  minDate = new Date(2015, 5, 1);
  maxDate = new Date();

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);

    const initialDate = props.value === undefined ? null : new Date(props.value);
    this.state = {
      value: initialDate,
      errors: []
    }
  }

  handleChange(e, value) {
    this.props.changed({[this.inputName]: value});
    this.setState({value});
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
      cancel: {
        id: "LeaseCreatedInput.cancel",
        defaultMessage: "Zurück"
      },
      description1: {
        id: "LeaseCreatedInput.description1",
        defaultMessage: "Bitte gib hier das Vertragsdatum an."
      },
      description2: {
        id: "LeaseCreatedInput.description2",
        defaultMessage: "Leider erlaubt die Mietpreisbremse in Berlin nur Mietsenkungen für Verträge ab 1.Juni 2015."
      }
    });

    return <Card className="assistantInput" id={this.inputName}>
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage {...messages.description1} /></p>
        <p><FormattedMessage {...messages.description2} /></p>
        <DatePicker 
          name={this.inputName} 
          hintText={this.props.intl.formatMessage(messages.inputLabel)}
          cancelLabel={this.props.intl.formatMessage(messages.cancel)}
          className="textInput"
          DateTimeFormat={DateTimeFormat}
          openToYearSelection={true}
          minDate={this.minDate}
          maxDate={this.maxDate}
          locale={"de"}
          autoOk={true}
          hideCalendarDate={true}
          value={this.state.value}
          onChange={this.handleChange} />
      </CardText>
    </Card>;
  }
}

export default injectIntl(LeaseCreatedInput);