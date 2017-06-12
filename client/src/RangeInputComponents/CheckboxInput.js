// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages } from 'react-intl';

import './CheckboxInput.css';

type CheckboxInputProps = {
  changed: (string, string) => mixed, 
  name: string,
  positive: boolean,
  message: ?string
};

const messages = defineMessages({
  "applies": {
    id: "Rangeinput.FeatureApplies",
    defaultMessage: "Trifft zu"
  },
  "atLeastOne": {
    id: "Rangeinput.AtleastOneFeatureApplies",
    defaultMessage: "Mindestens eins trifft zu"
  }
})

class CheckboxInput extends React.Component {
  state: {
    value: ?boolean
  };

  constructor(props: CheckboxInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      value: null
    };
  }

  handleChange(ev: SyntheticInputEvent) {
    this.setState({value: ev.target.checked})
    this.props.changed(this.props.name, this.props.positive, ev.target.checked);
  }

  render() {
    let message;
    switch (this.props.message) {
      case "applies":
        message = <FormattedMessage {...messages["applies"]} />;
        break;

      case "atLeastOne":
        message = <FormattedMessage {...messages["atLeastOne"]} />;
        break

      default:
        message = "";
    }

    return <span>
      <input
        id={this.props.name}
        name={this.props.name}
        className="rangeCheckbox"
        type="checkbox"
        value={this.props.name}
        checked={this.state.value === true}
        onChange={this.handleChange} /> 
      {message}
    </span>;
  }
}

export default CheckboxInput;