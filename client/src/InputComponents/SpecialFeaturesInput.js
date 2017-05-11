// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages} from 'react-intl';

import {AssistantInputProps} from './Tools';

class SpecialFeaturesInput extends React.Component {
	state: {
		value: string
	};

	inputName: string = "specialFeatures";

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
			value: "default"
		}
	}

  componentDidMount() {
    this.props.valid(this.inputName, true);
  }

	handleChange(e: SyntheticInputEvent) {
    this.setState({value: e.target.value});
    this.props.changed(this.inputName, e.target.value);
	}

	render() {
		const radioControls = this.options.map((name, i) => <div key={"specialFeaturesOptions-" + i}>
      <input
        id={"specialFeaturesOptions" + i}
        name={this.inputName}
        type="radio"
        value={name}
        checked={this.state.value === name} 
        onChange={this.handleChange} />
      <FormattedMessage
        {...this.optionDescriptions[name]} />}
		</div>);
		return <div className="assistantInput">
			<p><label hmtlFor={this.inputName}>
        <FormattedMessage
          id="SpecialFeaturesInput.label"
          defaultMessage="Gibt es noch was außergewöhnliches?" />
			</label></p>
			{radioControls}
		</div>;
	}
}

export default SpecialFeaturesInput;