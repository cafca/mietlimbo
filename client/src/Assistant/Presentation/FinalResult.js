// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl } from 'react-intl';

import { stageNameTranslations, featureGroupNames } from "../Assistant";
import type {Result, Data} from "../Assistant";
import Mietwucher from "./Mietwucher";
import RenovationCase from "./RenovationCase";
import {groupBalance} from "../ApartmentFeatureInputs/RangeSelectionGroup";
import FeatureShortnames from "../ApartmentFeatureInputs/FeatureShortnames";
import FeatureTable from "./FeatureTable";

import { 
  LocalRentLevel, 
  Mietpreisbremse,
  PreviousRentCase 
} from "./Calculation";

import { blue500, pinkA200 } from 'material-ui/styles/colors';

type FinalResultProps = {
  data: Data,
  changed: Function
};

class FinalResult extends React.Component {
  inputName: "FinalResult";

  constructor(props: FinalResultProps) {
    super(props);
    autoBind(this);
  }

  render() {
    return <div>
      <h1><FormattedMessage 
        id="FinalResult.calculationTitle" 
        defaultMessage="Dein mietlimbo: {result, number, currency} 😱" 
        values={{result: Math.max(this.props.data.result.mietlimbo, this.props.data.previousRent)}} /></h1>
      <p><FormattedMessage
        id="FinalResult.tableDescription"
        defaultMessage="Das könnte deine Miete sein! Aber zunächst von vorne: In dieser Tabelle siehst du nochmal alle von dir gewählten Merkmale. In der rechten Spalte wird für jede Merkmalgruppe gezeigt, 
          ob positive oder negative Merkmale überwiegen. Ganz unten rechts wird daraus wiederum die Balance aller Merkmalgruppen berechnet." />
      </p>
      
      <FeatureTable {...this.props.data} />

      <LocalRentLevel {...this.props.data} />

      <Mietpreisbremse {...this.props.data} />

      <p>
        <FormattedMessage
          id="FinalResult.comparison"
          defaultMessage="Das sind jeden Monat {diff, number, currency} {diffDir} als du jetzt zahlst."
          values={{
            diff: Math.abs(this.props.data.rent - this.props.data.result.mietlimbo),
            diffDir: this.props.data.rent - this.props.data.result.mietlimbo < 0 ? 'mehr' : 'weniger'
          }} />
      </p>

      <RenovationCase
        renovationInput={this.props.data.renovation}
        rent={this.props.data.rent}
        mpbRent={this.props.data.result.mietlimbo} />

      <PreviousRentCase {...this.props.data} />

      <Mietwucher 
        rent={this.props.data.rent}
        mpbRent={this.props.data.result.mietlimbo} />

      <section>
        <h2>
          <FormattedMessage
            id="FinalResult.recommendationTitle"
            defaultMessage="Wie geht es weiter?" />
        </h2>
        <p><FormattedMessage
          id="FinalResult.recommendations"
          defaultMessage="Um herauszufinden, wie du mit dieser Information deine Miete senken kannst empfehle ich dir, 
            den Artikel von {ChristopherStark} zu lesen, der diese Seite inspiriert hat."
          values={{
            ChristopherStark: <a target="_blank" rel="noopener noreferrer" href="https://blog.mietlimbo.de/2017/04/18/mietpreisbremse-betaetigen/">Christopher Stark</a>
          }} /></p>
      </section>
    </div>;
  }
}

export default injectIntl(FinalResult);