// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages } from 'react-intl';

type CheckboxInputProps = {
  changed: (string, string) => mixed, 
  name: string,
  message: ?string
};

const messages = defineMessages({
  "default": {
    id: "Rangeinput.FeatureChecked",
    defaultMessage: "Trifft zu"
  },
  "atLeastOne": {
    id: "Rangeinput.AtleastOneFeatureChecked",
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
    this.props.changed({[this.props.name]: ev.target.checked});
  }

  render() {
    const message = this.props.message === undefined 
      ? messages["default"] : messages[this.props.message];

    return <div>
      <input
        id={this.props.name}
        name={this.props.name}
        type="checkbox"
        value={this.props.name}
        checked={this.state.value === true}
        onChange={this.handleChange} /> 
      <FormattedMessage {...message} />
    </div>;
  }
}

export class BathCheckboxInput extends CheckboxInput {
  constructor(props: CheckboxInputProps) {
    super(props);
  }

  handleChange(ev: SyntheticInputEvent) {
    const fieldName = "Bath-" + this.props.name;
    this.setState({value: ev.target.checked});
    this.props.changed({[fieldName]: ev.target.checked});
  }
}

export default CheckboxInput;