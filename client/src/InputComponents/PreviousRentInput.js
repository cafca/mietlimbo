// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import {ErrorList} from './Tools';
import type {AssistantInputProps} from './Tools';

class PreviousRentInput extends React.Component {
  state: {
    value: string,
    errors: Array<any>
  }

  inputName: string = "previousRent";

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
        id="PreviousRentInput.errorNotANumber" 
        defaultMessage="Bitte gib die Vormiete als Zahl an." />);
    } else if (fValue < 1) {
      errors.push(<FormattedMessage 
        id="PreviousRentInput.errorRentTooLow" 
        defaultMessage="Das ist zu wenig. Bitte gib die Vormiete an." />);
    } else if (e.target.value.indexOf(",") > -1) {
      errors.push(<FormattedMessage
        id="PreviousRentInput.errorDecSeparator"
        defaultMessage="Bitte benutze einen Punkt, um Nachkommastellen zu trennen. Also z.B. '460.80'."
        />);
    } else {
      this.props.changed({[this.inputName]: fValue});
    }

    // input is valid if no errors encountered
    this.props.valid(this.inputName, errors.length === 0);
    this.setState({value: e.target.value, errors});
  }

  handleUnknown(e: SyntheticInputEvent, value: boolean) {
    this.props.changed({[this.inputName]: value ? -1 : null})
    this.props.valid(this.inputName, value);
    this.setState({value: "", errors: []});
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "PreviousRentInput.title",
        defaultMessage: "Wieviel Kaltmiete hat dein Vormieter bezahlt?"
      },
      description: {
        id: "PreviousRentInput.description",
        defaultMessage: `Egal, was bei dieser ganzen Berechnung herauskommt: Mit der Mietpreisbremse kannst du die 
          Miete nicht weiter senken, als auf die Miete des Vormieters. Auch in diesem Betrag sind keine Heizkosten oder 
          Nebenkosten enthalten.`
      },
      inputHint: {
        id: "PreviousRentInput.hint",
        defaultMessage: "Zum Beispiel: 460.80"
      },
      unknown: {
        id: "PreviousRentInput.unknown",
        defaultMessage: "Keine Ahnung!"
      },
      unknownWarning: {
        id: "PreviousRentInput.unknownWarning",
        defaultMessage: `Um einschätzen zu können, wie deine Chancen auf eine Mietsenkung stehen, musst du die Vormiete
          unbedingt kennen. Dein Vermieter ist verpflichtet, dir diese mitzuteilen, also kannst du ihn natürlich einfach
          fragen. Aber was, wenn er das einfach nicht tut? Du könntest natürlich vor Gericht gehen, aber wer will das schon?
          Bei Pro Mietrecht findest du einige Ideen, wie du vielleicht doch an diese Information kommen kannst: {link}. `
      },
      unknownEncouragement: {
        id: "PreviousRentInput.unknownEncouragement",
        defaultMessage: `Ansonsten mach einfach erstmal weiter. Du wirst am Ende dieses Assistenten nochmal daran erinnert.`
      }
    });

    const errors = this.state.errors.length === 0 ? null : <ErrorList errors={this.state.errors} />;

    const unknownExplainer = this.props.value === -1 ?
      <div>
        <p><FormattedMessage {...messages.unknownWarning} values={
          {link: <a href="https://www.promietrecht.de/Miete/Mietgrenzen/angespannter-Wohnungsmarkt/Neuvermietung/Mietpreisbremse-Auskunft-zur-frueheren-Miete-bekommen-E2805.htm" target="_blank" rel="noopener noreferrer">Mietpreisbremse - Auskunft zur früheren Miete bekommen</a>}
        }/></p>
        <p><FormattedMessage {...messages.unknownEncouragement} /></p>
      </div> : null;

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage {...messages.description} /></p>
        <TextField 
          id={this.inputName}
          name={this.inputName}
          hintText={this.props.intl.formatMessage(messages.inputHint)}
          errorText={errors}
          className="textInput"
          value={this.props.value >= 0 ? this.state.value : ""}
          disabled={this.props.value === -1}
          onChange={this.handleChange} />
      </CardText>
      <CardText>
        <Checkbox 
          checked={this.props.value === -1}
          onCheck={this.handleUnknown}
          label={this.props.intl.formatMessage(messages.unknown)}
        />
        {unknownExplainer}
      </CardText>
    </Card>;
  }
}

export default injectIntl(PreviousRentInput);