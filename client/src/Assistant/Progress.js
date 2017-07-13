// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { injectIntl } from 'react-intl';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

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

  handleClick(i: number) {
    this.props.advance(i - this.props.stage + 1);
  }

  render() { 
    const steps = this.props.stageNames.map((l, i) => <Step style={this.style.step} key={l} className="progressBarStep">
          <StepLabel onClick={() => this.handleClick(i)} style={this.style.stepLabel}>{l}</StepLabel>
        </Step>);

    return <section style={this.style.main}>
      <Stepper activeStep={(this.props.stage - 1)} orientation="vertical" >
        {steps}
      </Stepper>
    </section>;
  }
}

export default injectIntl(Progress);