// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import type {AssistantInputProps} from './Tools';

class BaseFeaturesInput extends React.Component {
	inputName: string = "baseFeatures";

	options = ["nobath", "noheating", "both", "default"];
	optionDescriptions = defineMessages({
		"nobath": {
			id: "nobath",
			defaultMessage: "Ich habe eine Toilette, aber weder Bad noch Dusche in der Wohnung."
		},
		"noheating": {
			id: "noheating",
			defaultMessage: "Es gibt bei mir keine Sammelheizung, die alle Wohnräume gleichzeitig heizen kann."
		},
		"both": {
			id: "both",
			defaultMessage: "Beides! (Oha)"
		},
		"default": {
			id: "default",
			defaultMessage: "Nichts davon"
		}
	})

	constructor(props: AssistantInputProps) {
		super(props);
		autoBind(this);
	}

  componentDidMount() {
    if (this.props.value !== undefined) this.props.valid(this.inputName, true);
  }

	handleChange(e: SyntheticInputEvent, value: string) {
    this.props.changed({[this.inputName]: value}, 
      () => this.props.valid(this.inputName, true));
	}

	render() {
		const radioControls = this.options.map((name, i) => <RadioButton
      key={"BaseFeaturesOptions-" + i}
      value={name}
      label={this.props.intl.formatMessage(this.optionDescriptions[name])} />
    );

    const messages = defineMessages({
      title: {
        id: "BaseFeaturesInput.label",
        defaultMessage: "Gibt es noch was außergewöhnliches?"
      },
      warning: {
        id: "BaseFeaturesInput.warning",
        defaultMessage: `Die Daten im Mietspiegel zu Wohnungen mit einer solchen
          außergewöhnlichen Ausstattung beruhen auf sehr wenigen Mietwerten und 
          haben daher nur eine geringe Aussagekraft. Für einen solchen Sonderfall
          empfiehlt Mietlimbo unbedingt, deinen Fall mit einem Mieterverein 
          durchzusprechen. `
      }
    })

    const warning = this.props.value === undefined || this.props.value === "default" ? "" : 
      <p style={{color: "red"}}><FormattedMessage {...messages.warning} /></p>;

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <RadioButtonGroup
          name={this.inputName}
          onChange={this.handleChange} 
          valueSelected={this.props.value} >
          {radioControls}
        </RadioButtonGroup>
        {warning}
      </CardText>
		</Card>;
	}
}

export default injectIntl(BaseFeaturesInput);