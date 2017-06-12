// @flow
import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

type RangeSelectionGroupProps = {
  changed: Object => any,
  inputComponents: Object,
  domain: string
};

class RangeSelectionGroup extends React.Component {
  state = {
    positive: {},
    negative: {}
  }

  constructor(props: RangeSelectionGroupProps) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.evaluation();
  }

  evaluation() {
    const counter = store => Object.keys(store).reduce(
      (acc, cur) => store[cur] === true ? acc + 1 : acc, 0);

    const result = counter(this.state.positive) - counter(this.state.negative);
    this.props.changed({[this.props.domain]: result});
  }

  handleChange(name: string, positive: boolean, value: boolean) {
    const cat = positive === true ? "positive" : "negative";
    this.setState({[cat]: Object.assign({}, this.state[cat], {[name]: value})}, this.evaluation);
  }

  render() {
    const inputElements = Object.keys(this.props.inputComponents).map(
      k => React.createElement(
        this.props.inputComponents[k], 
        {changed: this.handleChange, key: k}, 
        null)
      );

    return <div>{inputElements}</div>;
  }
}

export default RangeSelectionGroup;