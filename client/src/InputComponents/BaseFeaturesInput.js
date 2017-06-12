// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages} from 'react-intl';

import type {AssistantInputProps} from './Tools';

class BaseFeaturesInput extends React.Component {
	state: {
		value: ?string
	};

	inputName: string = "baseFeatures";

	options = ["nobath", "noheating", "both", "default"];
	optionDescriptions = defineMessages({
		"nobath": {
			id: "either",
			defaultMessage: "Ich habe eine Toilette, aber weder Bad noch Dusche in der Wohnung."
		},
		"noheating": {
			id: "either",
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
			value: undefined
		}
	}

	handleChange(e: SyntheticInputEvent) {
    this.setState({value: e.target.value});
    this.props.changed({[this.inputName]: e.target.value});
    this.props.valid(this.inputName, true);
	}

	render() {
		const radioControls = this.options.map((name, i) => <div key={"BaseFeaturesOptions-" + i}>
      <input
        id={"BaseFeaturesOptions" + i}
        name={this.inputName}
        type="radio"
        value={name}
        checked={this.state.value === name} 
        onChange={this.handleChange} />
      <FormattedMessage
        {...this.optionDescriptions[name]} />
		</div>);

		return <div className="assistantInput">
			<p>
        <label htmlFor={this.inputName}>
          <FormattedMessage
            id="BaseFeaturesInput.label"
            defaultMessage="Gibt es noch was außergewöhnliches?" />
			 </label>
			 {radioControls}
      </p>
		</div>;
	}
}

export default BaseFeaturesInput;