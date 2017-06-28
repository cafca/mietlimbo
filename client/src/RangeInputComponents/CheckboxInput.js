// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';

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

  handleChange(ev: SyntheticInputEvent, checked: boolean) {
    this.setState({value: checked})
    this.props.changed(this.props.name, this.props.positive, checked);
  }

  render() {
    let message;
    switch (this.props.message) {
      case "applies":
        message = this.props.intl.formatMessage(messages["applies"]);
        break;

      case "atLeastOne":
        message = this.props.intl.formatMessage(messages["atLeastOne"]);
        break

      default:
        message = this.props.message;
    }

    return <Checkbox
      id={this.props.name}
      name={this.props.name}
      label={message}
      className="rangeCheckbox"
      value={this.props.name}
      checked={this.state.value === true}
      onCheck={this.handleChange} />;
  }
}

export default injectIntl(CheckboxInput);