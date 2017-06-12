// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

import {ErrorList} from './Tools';

import type {AssistantInputProps} from './Tools';

class LeaseCreatedInput extends React.Component {
  state: {
    value: string,
    errors: Array<any>
  };

  inputName = "leaseCreated";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      value: "",
      errors: []
    }
  }

  handleChange(e: SyntheticInputEvent) {
    const errors = [];
    const value = e.target.value;
    if (isNaN(Date.parse(value))) {
      errors.push(<FormattedMessage 
        id="LeaseCreatedInput.error" 
        defaultMessage="Bitte gib hier ein Datum im Format dd.mm.yyy an, also z.B. 15.01.2016." />)
    } else {
      this.props.changed({[this.inputName]: value});
    }
    this.setState({errors, value});
    this.props.valid(this.inputName, errors.length === 0);
  }

  render() {
    return <div className="assistantInput">
      <p><label htmlFor={this.inputName}>
        <FormattedMessage
          id="LeaseCreatedInput.label"
          defaultMessage="Wann wurde dein Mietvertrag abgeschlossen?" />
      </label></p>
      <input 
        id={this.inputName}
        name={this.inputName}
        className="textInput"
        type="date"
        value={this.state.value} 
        onChange={this.handleChange} />
      <ErrorList errors={this.state.errors} />
    </div>;
  }
}

export default LeaseCreatedInput;