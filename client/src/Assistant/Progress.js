// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
      height: 3
    }
  }

  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleNext() {
    this.props.advance(1);
  }

  handlePrev() {
    this.props.advance(-1);
  }

  render() { 
    const steps = this.props.stageNames.map(l => <Step style={this.style.step} key={l}>
          <StepLabel style={this.style.stepLabel}>{l}</StepLabel>
        </Step>);

    return <section style={this.style.main}>
      <Stepper activeStep={(this.props.stage - 1)} orientation="vertical" >
        {steps}
      </Stepper>
    </section>;
  }
}

export default injectIntl(Progress);