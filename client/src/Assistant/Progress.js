// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { injectIntl, FormattedMessage } from 'react-intl';
import Sticky from "react-stickynode";
import { NavLink } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton';
import { blue300, pinkA200, grey400 } from 'material-ui/styles/colors';
import Paper from "material-ui/Paper";

import { stageNames } from "./Config";
import { stageNameTranslations } from "./Assistant";
import {groupBalance} from"./ApartmentFeatureInputs/RangeSelectionGroup";

type ProgressProps = {
  advance: number => any,
  stage: number,
  isStageEnabled: number => any
};

class Progress extends React.Component {
  style = {
    main: {
      marginBottom: "1em"
    },
    stageButton: {
      borderRadius: 0
    },
    activeStageButton: {
      borderRadius: 0,
      color: "white"
    },
    anchorStageButton: {
      borderRadius: 0,
      verticalAlign: "top"
    },
    stageGroupLabel: {
      width: 40, 
      minWidth: 40, 
      borderRadius: 0
    },
    spacer: {
      height: 5
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
    const ButtonLabel = (props: {stageName: string, index: number}) => {
      const balance = groupBalance(this.props.data[stageNames[props.index]]);
      const isBadgeEnabled = (3 < props.index) && (props.index < 9) && balance !== 0;
      const badge = isBadgeEnabled ? (balance < 0 ? balance : <span>+{balance}</span>) : null;
      return <span><FormattedMessage {...stageNameTranslations[props.stageName]} /> {badge}</span>;
    }

    const stageButtons = stageNames.map(
      (l, i) => {return <FlatButton 
        label={<ButtonLabel stageName={l} index={i} />} 
        key={l}
        onClick={() => this.handleClick(i)} 
        disabled={!this.props.isStageEnabled(i)} 
        primary={this.props.stage === (i) ? false : groupBalance(this.props.data[stageNames[i]]) < 0}
        secondary={this.props.stage === (i) ? false : groupBalance(this.props.data[stageNames[i]]) > 0}
        style={this.props.stage === (i) ? this.style.activeStageButton : this.style.stageButton}
        backgroundColor={this.props.stage === (i) 
          ? groupBalance(this.props.data[stageNames[i]]) < 0 
            ? blue300 // group is negative
            : groupBalance(this.props.data[stageNames[i]]) > 0 
              ? pinkA200  // group is positve
              : grey400  // group is neutral or button is not for a group
          : null // no backgroundcolor if not active
        }
      />;}
      );

    return <section style={this.style.main} className="navigation">
      <Sticky enabled={this.props.stage <= 3} innerZ={4}>
        <Paper className="featureGroups" zDepth={3}>
          <FlatButton 
            label="Ⅰ" 
            key={"Stage 1"}
            disabled={true} 
            style={this.style.stageGroupLabel}
          />
          {stageButtons.slice(0, 4)}
        </Paper>
      </Sticky>

      <div style={this.style.spacer} />

      <Sticky enabled={this.props.stage > 3 && this.props.stage < 9} innerZ={3}>
        <Paper className="featureGroups" zDepth={2}>
          <FlatButton 
            label="Ⅱ" 
            key={"Stage 2"}
            disabled={true} 
            style={this.style.stageGroupLabel}
          />
          {stageButtons.slice(4, 9)}
        </Paper>
      </Sticky>

      <div style={this.style.spacer} />

      <Sticky enabled={this.props.stage >= 9} innerZ={2}>
        <Paper className="featureGroups">
          <FlatButton 
            label="Ⅲ" 
            key={"Stage 3"}
            disabled={true} 
            style={this.style.stageGroupLabel}
          />
          {stageButtons.slice(9)}
          <FlatButton 
            label="Blog" 
            key={"Blog"}
            href="https://blog.mietlimbo.de/"
            target="_blank"
            style={this.style.anchorStageButton}
          />
          <FlatButton 
            label="Über" 
            key={"Über"}
            style={this.style.anchorStageButton}
            containerElement={<NavLink to="/about/" target="_blank" />}
          />
        </Paper>
      </Sticky>
    </section>;
  }
}

export default injectIntl(Progress);