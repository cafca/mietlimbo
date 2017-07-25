// @flow
import React from 'react';
import autoBind from 'react-autobind';
import { intlShape } from 'react-intl';

// Properties passed to a RangeSelectionGroup
type RangeSelectionGroupProps = {
  changed: Object => any,
  inputComponents: Object,
  domain: string,
  inputData: {
    positive: Array<string>,
    negative: Array<string>
  }
};

// Properties passed by a RangeSelectionGroup to its input components
export type RangeInputProps = {
  changed: (string, string) => any,
  intl: intlShape,
  value: boolean
};

class RangeSelectionGroup extends React.Component {
  constructor(props: RangeSelectionGroupProps) {
    super(props);
    autoBind(this);
  }

  handleChange(name: string, positive: boolean, value: boolean) {
    const cat = positive === true ? "positive" : "negative";

    // If `value` is true, a feature was added, otherwise a feature was removed
    const newFeatureList = this.props.inputData[cat].slice();
    if (value === true) {
      newFeatureList.splice(-1, 0, name);
    } else {
      const position = this.props.inputData[cat].indexOf(name);
      newFeatureList.splice(position, 1);
    }

    // Balance increases when positive features are added or negative ones
    // removed and vice verse
    const balance = positive === value 
      ? this.props.inputData.balance + 1 
      : this.props.inputData.balance - 1;

    this.props.changed({[this.props.domain]: {
      positive: positive === true ? newFeatureList : this.props.inputData.positive,
      negative: positive === false ? newFeatureList : this.props.inputData.negative,
      balance
    }});
  }

  render() {
    // The index of checked fields allows passing in the current value to the input
    // componenet below by checking whether it's included in this index
    const checkedFields = this.props.inputData === undefined ? [] 
      : this.props.inputData.negative.concat(this.props.inputData.positive);

    const inputElements = Object.keys(this.props.inputComponents).map(
      k => React.createElement(
        this.props.inputComponents[k], 
        {changed: this.handleChange, key: k, value: (checkedFields.indexOf(k) >= 0)}, 
        null)
      );

    return <div className="RangeSelectionGroup">{inputElements}</div>;
  }
}

export default RangeSelectionGroup;