// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { injectIntl, FormattedMessage } from 'react-intl';
import Sticky from "react-stickynode";
import Paper from "material-ui/Paper";

import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Chip from 'material-ui/Chip';
import {
  blue500, blue700, blue300, red300, 
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import { stageNames } from "./Assistant";
import SectionPicture from './SectionPicture';
import {groupBalance} from"./ApartmentFeatureInputs/RangeSelectionGroup";

type ProgressProps = {
  advance: number => any,
  stage: number,
  isStageEnabled: number => any,
  serialNumber: string,
  intermediateResult: {
    max: number, mid: number, min: number
  }
};

class Progress extends React.Component {
  style = {
    main: {
      marginBottom: "1em"
    },
    stageButton: {
      zIndex: 3, 
      borderRadius: 0
    },
    activeStageButton: {
      zIndex: 3, 
      borderRadius: 0,
      color: "white"
    },
    result: {
      fontSize: 16
    }
  }

  constructor(props: ProgressProps) {
    super(props);
    autoBind(this);
  }

  handleClick(i: number) {
    this.props.requestStage(i);
  }

  render() { 
    const stageKeys = [null,null,null,null,"BathGroup", "KitchenGroup", "ApartmentGroup", "BuildingGroup", "EnvironmentGroup",null];
    
    const ButtonLabel = (props: {stageName: string, index: number}) => {
      const balance = groupBalance(this.props.data[stageKeys[props.index]]);
      const isBadgeEnabled = (3 < props.index) && (props.index < 9) && balance !== 0;
      const badge = isBadgeEnabled ? (balance < 0 ? balance : <span>+{balance}</span>) : null;
      return <span>{props.stageName} {badge}</span>;
    }

    const stageButtons = stageNames.map(
      (l, i) => {return <FlatButton 
        label={<ButtonLabel stageName={l} index={i} />} 
        key={l}
        onClick={() => this.handleClick(i)} 
        disabled={!this.props.isStageEnabled(i)} 
        primary={this.props.stage === (i) ? false : groupBalance(this.props.data[stageKeys[i]]) < 0}
        secondary={this.props.stage === (i) ? false : groupBalance(this.props.data[stageKeys[i]]) > 0}
        style={this.props.stage === (i) ? this.style.activeStageButton : this.style.stageButton}
        backgroundColor={this.props.stage === (i) 
          ? groupBalance(this.props.data[stageKeys[i]]) < 0 
            ? blue300 // group is negative
            : groupBalance(this.props.data[stageKeys[i]]) > 0 
              ? pinkA200  // group is positve
              : grey400  // group is neutral or button is not for a group
          : null // no backgroundcolor if not active
        }
      />;}
      );

    let rentLevel = null;
    // may be undefined or null
    // eslint-disable-next-line eqeqeq
    if (this.props.data.FinalResult != undefined) {
      rentLevel = <div style={this.style.result}>
        <p><FormattedMessage 
          id="Progress.finalResult"
          defaultMessage="mietlimbo level {lower, number, currency} unter deiner jetzigen Miete!"
          values={{lower: this.props.data.rent - this.props.data.FinalResult}} /></p>
      </div>;
    // eslint-disable-next-line eqeqeq
    } else if (this.props.data.intermediateResult != undefined && this.props.data.intermediateResult.min != undefined) {
      const irValues = {
        min: Math.abs(this.props.data.intermediateResult.min * 1.1 * this.props.data.squareMeters - this.props.data.rent)
      }
          
      rentLevel = <div style={this.style.result}>
        <p><FormattedMessage 
          id="Progress.intermediateResult"
          defaultMessage="mietlimbo level bis zu {min, number, currency} unter deiner jetzigen Miete!"
          values={irValues} /></p>
      </div>;
    }

    // <SectionPicture name={stageNames[this.props.stage - 1]} />
      // <Tabs value={(this.props.stage - 1)} onChange={this.handleClick}>
        // {tabs}
      // </Tabs>

    return <section style={this.style.main}>
      <Sticky enabled={this.props.stage <= 3} innerZ={4}>
        <Paper className="featureGroups" zDepth={3}>
          <FlatButton 
            label="Ⅰ" 
            key={"Stage 1"}
            disabled={true} 
            primary={this.props.stage <= 3}
            style={{width: 40, minWidth: 40, zIndex: 3, borderRadius: 0}}
          />
          {stageButtons.slice(0, 4)}
        </Paper>
      </Sticky>

      <div style={{height: 5}} />

      <Sticky enabled={this.props.stage > 3} innerZ={3}>
        <Paper className="featureGroups" zDepth={2}>
          <FlatButton 
            label="Ⅱ" 
            key={"Stage 2"}
            disabled={true} 
            primary={this.props.stage > 3}
            style={{width: 40, minWidth: 40, zIndex: 3, borderRadius: 0}}
          />
          {stageButtons.slice(4)}
        </Paper>
      </Sticky>

      <div className="rangeVisualisation">
      </div>
    </section>;
  }
}

export default injectIntl(Progress);