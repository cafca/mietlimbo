// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

import type {AssistantInputProps} from '../InputComponents/Tools';

class IntermediateResult extends React.Component {
  state: {
    sufficientData: boolean,
    rentLevel: number,
    lowerBound: number,
    upperBound: number
  };

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      sufficientData: true,
      rentLevel: 5.43,
      lowerBound: 4.13,
      upperBound: 7.42
    }
  }

  componentDidMount() {
    this.props.changed({intermediateResult: this.state});
    this.props.valid("intermediateResult", true);
  }

  render() {
    return <div>
      <p><FormattedMessage
        id="IntermediateResult.success"
        defaultMessage="Es gibt im Berliner Mietspiegel genug Daten für Wohnungen wie deine!"
      /></p>

      <p><FormattedMessage 
        id="IntermediateResult.info"
        defaultMessage="Die ortsübliche Vergleichsmiete beträgt demnach {rentLevel} Euro. Je nachdem, wie gut deine 
        Wohnung ausgestattet ist, wird von diesem Wert noch etwas abgezogen oder dazugerechnet. 
        Dadurch kann der normale Mietpreis für eine Wohnung wie deine zwischen 
        {lowerBound} Euro und {upperBound} Euro pro Quadratmeter liegen." 
        values={this.state} /></p>

      <p><FormattedMessage
        id="IntermediateResult.encouragement"
        defaultMessage="Lass uns das rausfinden! Hierfür frage ich dich 82 Fragen. 
        Klingt viel, ist es auch. Macht nix, los!" /></p>
    </div>;
  }
}

export default IntermediateResult;