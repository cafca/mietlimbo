// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import type {AssistantInputProps} from './Tools';

class BaseFeaturesInput extends React.Component {
	state: {
		value: ?string
	};

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
		this.state = {
			value: null
		}
	}

	handleChange(e: SyntheticInputEvent, value: string) {
    this.setState({value});
    this.props.changed({[this.inputName]: value});
    this.props.valid(this.inputName, true);
	}

	render() {
		const radioControls = this.options.map((name, i) => <RadioButton
      key={"BaseFeaturesOptions-" + i}
      value={name}
      label={this.props.intl.formatMessage(this.optionDescriptions[name])} />);

    const messages = defineMessages({
      title: {
        id: "BaseFeaturesInput.label",
        defaultMessage: "Gibt es noch was außergewöhnliches?"
      }
    })

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <RadioButtonGroup
          name={this.inputName}
          value={this.state.value}
          onChange={this.handleChange} >
          {radioControls}
        </RadioButtonGroup>
      </CardText>
		</Card>;
	}
}

export default injectIntl(BaseFeaturesInput);