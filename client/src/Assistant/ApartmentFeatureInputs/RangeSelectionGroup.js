// @flow
import React from 'react';
import autoBind from 'react-autobind';
import { intlShape } from 'react-intl';

import { stageNames } from "../Assistant";
import type {Data} from "../Assistant";

import './Styles.css';

export type GroupData = {
  positive: Array<string>,
  negative: Array<string>
};

// Properties passed to a RangeSelectionGroup
type RangeSelectionGroupProps = {
  changed: Object => any,
  inputComponents: Object,
  domain: string,
  data: Data
};

// Properties passed by a RangeSelectionGroup to its input components
export type RangeInputProps = {
  changed: (string, string) => any,
  intl: intlShape,
  value: boolean,
  directValue: Data,
  directChanged: {[string]: any} => any
};

export const groupBalance = (props: GroupData) => 
  // eslint-disable-next-line eqeqeq
  props == undefined ? 0 : props.positive.length - props.negative.length;

class RangeSelectionGroup extends React.Component {
  groupData : GroupData;

  constructor(props: RangeSelectionGroupProps) {
    super(props);
    autoBind(this);
    this.groupData = this.props.data[this.props.domain];
  }

  componentWillReceiveProps(nextProps: RangeSelectionGroupProps) {
    this.groupData = nextProps.data[this.props.domain];
  }

  handleChange(name: string, positive: boolean, value: boolean, cb: ?() => any) {
    const cat = positive === true ? "positive" : "negative";

    // If `value` is true, a feature was added, otherwise a feature was removed
    const newFeatureList = this.groupData[cat].slice();
    if (value === true) {
      if (newFeatureList.indexOf(name) >= 0) {
        // Don't store the same feature twice
        // eslint-disable-next-line eqeqeq
        if(cb != undefined) cb();
        return;
      }
      newFeatureList.splice(-1, 0, name);
    } else {
      const position = this.groupData[cat].indexOf(name);
      if (position < 0) {
        // Stop here if the feature to be removed is not on the list
        // eslint-disable-next-line eqeqeq
        if(cb != undefined) cb();
        return;
      }
      newFeatureList.splice(position, 1);
    }

    console.log("Before:", this.groupData[cat], "After:", newFeatureList);

    const updatedData = Object.assign({}, this.groupData, {
      positive: positive === true ? newFeatureList : this.groupData.positive,
      negative: positive === false ? newFeatureList : this.groupData.negative
    });

    this.props.changed({[this.props.domain]: updatedData}, cb);
  }

  render() {
    // The index of checked fields allows passing in the current value to the input
    // componenet below by checking whether it's included in this index
    const checkedFields = this.groupData === undefined ? [] 
      : this.groupData.negative.concat(this.groupData.positive);

    const inputElements = Object.keys(this.props.inputComponents).map(
      k => React.createElement(
        this.props.inputComponents[k], 
        {
          changed: this.handleChange, 
          key: k, 
          value: (checkedFields.indexOf(k) >= 0),
          directValue: this.props.data,
          directChanged: this.props.changed
        }, 
        null)
      );

    return <div className="RangeSelectionGroup">{inputElements}</div>;
  }
}

export default RangeSelectionGroup;