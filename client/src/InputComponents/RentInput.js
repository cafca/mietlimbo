// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

import {ErrorList} from './Tools';
import type {AssistantInputProps} from './Tools';

class RentInput extends React.Component {
  state: {
    value: string,
    errors: Array<any>
  }

  inputName: string = "rent";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      value: "",
      errors: []
    }
  }

  handleChange(e: SyntheticInputEvent) {
    const fValue = parseFloat(e.target.value);
    const errors = [];

    if(isNaN(fValue)) {
      errors.push(<FormattedMessage 
        id="RentInput.errorNotANumber" 
        defaultMessage="Bitte gib deine Kaltmiete als Zahl an, z.B. '460.80'." />);
    } else if (fValue < 1) {
      errors.push(<FormattedMessage 
        id="RentInput.errorRentTooLow" 
        defaultMessage="Das ist zu wenig. Bitte gib deine Kaltmiete an." />);
    } else if (e.target.value.indexOf(",") > -1) {
      errors.push(<FormattedMessage
        id="RentInput.errorDecSeparator"
        defaultMessage="Bitte benutze einen Punkt, um Nachkommastellen zu trennen. Also z.B. '460.80'."
        />);
    } else {
      this.props.changed({[this.inputName]: fValue});
    }

    // input is valid if no errors encountered
    this.props.valid(this.inputName, errors.length === 0);
    this.setState({value: e.target.value, errors});
  }

  render() {
    return <div className="assistantInput">
      <p><label htmlFor="rent">
        <FormattedMessage 
          id="BasicData.rent" 
          defaultMessage="Wieviel Kaltmiete bezahlst du jetzt (in Euro, z.B. 480.20)?" />
      </label></p>
      <input
        id={this.inputName}
        name={this.inputName}
        type="text"
        className="textInput"
        value={this.state.value}
        onChange={this.handleChange} />
      <ErrorList errors={this.state.errors} />
    </div>;
  }
}

export default RentInput;