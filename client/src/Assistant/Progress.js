// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { injectIntl, FormattedMessage } from 'react-intl';

import Coins from '../Graphics/Coins.png';
import Contract from '../Graphics/Contract.png';
import Legal from '../Graphics/Legal.png';
import Bath from '../Graphics/Bath.png';
import Kitchen from '../Graphics/Kitchen.png';
import Apartment from '../Graphics/Apartment.png';
import Building from '../Graphics/Building.png';
import Energy from '../Graphics/Energy.png';
import Environment from '../Graphics/Environment.png';
import Zack from '../Graphics/Zack.png';
import Logo from '../Graphics/Logo.png';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import { stageNames } from "./Assistant";

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
      float: "left",
      width: 170,
      marginLeft: -190,
      marginTop: "1em"
    },
    items: {
      marginRight: 5
    },
    step: {
      height: 10
    },
    stepLabel: {
      height: 3,
      cursor: "pointer"
    },
    stepLabelDisabled: {
      height: 3
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
    const steps = stageNames.map(
      (l, i) => {
        return<Step style={this.style.step} key={l} className="progressBarStep">
          <StepLabel 
            onClick={() => this.handleClick(i + 1)} 
            style={this.props.isStageEnabled(i + 1) ? this.style.stepLabel : this.style.stepLabelDisabled}
            disabled={!this.props.isStageEnabled(i + 1)}
            completed={false}
            className={this.props.isStageEnabled(i + 1) ? "activeStepLabel" : null}
          >{l}</StepLabel>
        </Step>}
      );

    let rentLevel = null;
    // may be undefined or null
    // eslint-disable-next-line eqeqeq
    if (this.props.data.FinalResult != undefined) {
      rentLevel = <div style={this.style.result}>
        <p><FormattedMessage 
          id="Progress.finalResult"
          defaultMessage="Mit diesen Angaben kannst du {lower, number, currency} pro Monat sparen."
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
          defaultMessage="Du kannst bis zu {min, number, currency} pro Monat sparen."
          values={irValues} /></p>
      </div>;
    }


    return <section style={this.style.main}>
      <SectionPicture name={stageNames[this.props.stage - 1]} />
      {rentLevel}
      <Stepper activeStep={(this.props.stage - 1)} orientation="vertical" >
        {steps}
      </Stepper>
    </section>;
  }
}

const SectionPicture = (props) => {
  const style = {
    width: 170,
    marginBottom: 20
  };

  let src = null;
  switch (props.name) {
    case "Start":
      src = Contract;
      break;
    case "Eckdaten":
      src = Legal;
      break;
    case "Mietspiegelabfrage":
      src = Coins;
      break;
    case "Bad":
      src = Bath;
      break;
    case "Küche":
      src = Kitchen;
      break;
    case "Wohnung":
      src = Apartment;
      break;
    case "Gebäude":
      src = Building;
      break;
    case "Energie":
      src = Energy;
      break;
    case "Umfeld":
      src = Environment;
      break;
    case "Ergebnis":
      src = Zack;
      break;
    default:
      src = Logo;
  }
  // alt prop left empty as this image is decorative
  return <img src={src} style={style} alt="" />;
}

export default injectIntl(Progress);