// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButtonGroup, RadioButton} from 'material-ui/RadioButton';
import {red500} from 'material-ui/styles/colors';

import type {AssistantInputProps} from './Tools';

class RenovationInput extends React.Component {
  inputName: string = "renovation";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.valid(this.inputName, this.isValid(this.props.value));
  }

  isValid(value) {
    return value !== undefined && value !== "extended";
  }

  handleChange(e: SyntheticInputEvent, value: string) {
    this.props.changed({[this.inputName]: value});
    this.props.valid(this.inputName, this.isValid(value));
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "RenovationInput.title",
        defaultMessage: "Wurde die Wohnung seit der letzten Vermietung saniert?"
      },
      description: {
        id: "RenovationInput.description",
        defaultMessage: `Um zu verhindern, dass Vermieter Kosten sparen, indem sie Wohnungen nicht mehr sanieren,
          dürfen Vermieter einen Teil der Sanierungs- bzw. Modernisierungskosten auf die Miete umlegen. Bei 
          umfassenden Sanierungen wird die Mietpreisbremse sogar komplett ausgeschaltet.`
      },
      noneLabel: {
        id: "RenovationInput.noneLabel",
        defaultMessage: "Nicht saniert oder modernisiert."
      },
      simpleLabel: {
        id: "RenovationInput.simpleLabel",
        defaultMessage: `Wohnung wurde entweder seit der letzten Vermietung saniert/modernisiert, oder während der
          letzten Vermietung saniert, ohne, dass damals eine Mieterhöhung durchgeführt wurde.`
      },
      extendedLabel: {
        id: "RenovationInput.extendedLabel",
        defaultMessage: `Umfassende Modernisierung seit der letzten Vermietung, deren Kosten mindestens 1/3 der 
          Kosten eines entsprechenden Neubaus umfassen.`
      },
      extendedWarning: {
        id: "RenovationInput.extendedWarning",
        defaultMessage: `Leider gilt die Mietpreisbremse nicht nach einer umfassenden Sanierung.`
      },
      simpleNotice: {
        id: "RenovationInput.simpleNotic",
        defaultMessage: `In diesem Fall kannst du die folgenden Fragen so ausfüllen, als wäre die Modernisierung/Sanierung
          nicht durchgeführt worden. Am Ende berechnet Mietlimbo dann die minimalen Sanierungskosten, mit denen deine jetzige
          Miete zu rechtfertigen wäre. Dann kannst du abschätzen, ob du glaubst, dass die Kosten in Wirklichkeit niedriger
          gewesen sind.`
      }
    });

    const extendedWarning = this.props.value === "extended" 
      ? <p style={{color: red500}}><FormattedMessage {...messages.extendedWarning} /></p>
      : null;

    const simpleNotice = this.props.value === "simple" 
      ? <p><FormattedMessage {...messages.simpleNotice} /></p>
      : null;

    return <Card className="assistantInput" id={this.inputName}>
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage {...messages.description} /></p>
        <RadioButtonGroup
          name={this.inputName}
          onChange={this.handleChange} 
          valueSelected={this.props.value} >
          <RadioButton value="none" label={this.props.intl.formatMessage(messages.noneLabel)} />
          <RadioButton value="simple" label={this.props.intl.formatMessage(messages.simpleLabel)} />
          <RadioButton value="extended" label={this.props.intl.formatMessage(messages.extendedLabel)} />
        </RadioButtonGroup>
        {extendedWarning}
        {simpleNotice}
      </CardText>
    </Card>;
  }
}

export default injectIntl(RenovationInput);