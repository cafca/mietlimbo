// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

import {AssistantInputProps, ErrorList} from './Tools';

class RentInput extends React.Component {
  state: {
    value: number,
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
    const value = parseFloat(e.target.value);
    const errors = [];

    if(isNaN(value)) {
      errors.push(<FormattedMessage 
        id="RentInput.errorNotANumber" 
        defaultMessage="Bitte gib deine Kaltmiete als Zahl an, z.B. 460.80." />)
    } else if (value < 1) {
      errors.push(<FormattedMessage 
        id="RentInput.errorRentTooLow" 
        defaultMessage="Das ist zu wenig. Bitte gib deine Kaltmiete an." />)
    } else {
      this.props.changed(this.inputName, value);
    }

    // input is valid if no errors encountered
    this.props.valid(this.inputName, errors.length === 0);
    this.setState({value, errors});
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