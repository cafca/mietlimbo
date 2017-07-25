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

type ProgressProps = {
  advance: number => any,
  stageNames: Array<string>,
  stage: number,
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
    result: {
      fontSize: 16
    }
  }

  constructor(props: ProgressProps) {
    super(props);
    autoBind(this);
  }

  handleClick(i: number) {
    this.props.advance(i - this.props.stage + 1);
  }

  render() { 
    const steps = this.props.stageNames.map((l, i) => <Step style={this.style.step} key={l} className="progressBarStep">
          <StepLabel onClick={() => this.handleClick(i)} style={this.style.stepLabel}>{l}</StepLabel>
        </Step>);

      const rentLevel = this.props.finalResult ? <div style={this.style.result}>
        <p><FormattedMessage 
          id="Progress.finalResult"
          defaultMessage="Mit diesen Angaben kannst du {lower, number, currency} pro Monat sparen."
          values={{lower: this.props.rent - this.props.finalResult}} /></p>
      </div> : this.props.intermediateResult !== undefined ? <div style={this.style.result}>
        <p><FormattedMessage 
          id="Progress.intermediateResult"
          defaultMessage="Du kannst bis zu {min, number, currency} pro Monat sparen."
          values={{min: Math.abs(this.props.intermediateResult.min * 1.1 * this.props.squareMeters - this.props.rent), max: Math.min(0.00, (this.props.intermediateResult.max * 1.1 * this.props.squareMeters - this.props.rent))}} /></p>
      </div> : null;


    return <section style={this.style.main}>
      <SectionPicture name={this.props.stageNames[this.props.stage - 1]} />
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
  return <img src={src} style={style} />;
}

export default injectIntl(Progress);