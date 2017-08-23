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
    const calculationMessage = this.props.data.result.featureGroupBalance === 0
      ? <FormattedMessage
          id="FinalResult.calculationBalanced"
          defaultMessage="In deinem Fall halten sich positive und negative Merkmalgruppen die Waage. Hierdurch gilt direkt
            die ortsübliche Vergleichsmiete  aus dem ersten Teil von {localRentLevel, number} € pro Quadratmeter."
          values={this.props.data.result} />
      : this.props.data.result.featureGroupBalance < 0
        ? <FormattedMessage
            id="FinalResult.calculationNegative"
            defaultMessage="Insgesamt überwiegen Gruppen mit negativen (mietsenkenden) Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
              Wert der Spanneneinordnung {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum Minimalwert der Spanne abgezogen. Hierdurch ergibt sich
              die ortsübliche Vergleichsmiete {localRentLevel, number} € pro Quadratmeter."
            values={{
              balanceAbs: Math.abs(this.props.data.result.featureGroupBalance),
              correctionPercentage: Math.abs(this.props.data.result.featureGroupBalance) * 20,
              ...this.props.data.result
          }} />
        : <FormattedMessage
            id="FinalResult.calculationPositive"
            defaultMessage="Insgesamt überwiegen Gruppen mit positiven (mietsteigernden) Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
              Wert der Spanneneinordnung {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum Maximalwert der Spanne abgezogen. Hierdurch ergibt sich
              die ortsübliche Vergleichsmiete {localRentLevel, number} € pro Quadratmeter."
            values={{
              balanceAbs: Math.abs(this.props.data.result.featureGroupBalance),
              correctionPercentage: Math.abs(this.props.data.result.featureGroupBalance) * 20,
              ...this.props.data.result
          }} />;

    const isPreviousRentLimiting = this.props.data.previousRent > this.props.data.squareMeters * (this.props.data.result.localRentLevel * 1.1);
    const previousRentCase = this.props.data.previousRent === -1
      ? <FormattedMessage
          id="FinalResult.previousRentUnkown"
          defaultMessage="Denk daran, dass du die Miete nicht niedriger senken kannst, als die Miete des Vormieters war. Du hast angegeben,
            dass du diese nicht kennst, also wäre jetzt ein guter Schritt, zu überlegen, ob es sich bei diesem Ergebnis lohnen 
            könnte, mal Nachforschungen dazu zu starten." />
      : isPreviousRentLimiting
        ? <FormattedMessage
            id="FinalResult.previousRentLimiting"
            defaultMessage="Dadurch, dass deine Vormieter schon eine höhere Miete gezahlt haben, kannst du allerdings 
              nur auf deren Miete von {limit, number, currency} senken."
            values={{limit: this.props.data.previousRent}} />
        : <FormattedMessage
            id="FinalResult.previousRentNotLimiting"
            defaultMessage="Die Miete deines Vormieters lag auch unter diesem Wert und steht damit einer Mietsenkung nicht im Wege." />;

    return <div>
      <h1><FormattedMessage id="FinalResult.calculationTitle" defaultMessage="Dein mietlimbo: {result, number, currency} 😱" values={{result: this.props.data.result.mietlimbo}} /></h1>
      <p><FormattedMessage
        id="FinalResult.tableDescription"
        defaultMessage="Das könnte deine Miete sein! Aber zunächst von vorne: In dieser Tabelle siehst du nochmal alle von dir gewählten Merkmale. In der rechten Spalte wird für jede Merkmalgruppe gezeigt, 
          ob positive oder negative Merkmale überwiegen. Ganz unten rechts wird daraus wiederum die Balance aller Merkmalgruppen berechnet." />
      </p>
      
      <FeatureTable {...this.props.data} />

      <p>{calculationMessage}</p>

      <p>
        <FormattedMessage 
          id="FinalResult.prediction"
          defaultMessage="Nach einem Zuschlag von 10% auf die örtliche Vergleichsmiete ergibt sich
            für die beschriebene Wohnung ein maximaler Quadratmeterpreis von {mietlimboLevel, number} €, was bei einer Wohnungsgröße
            von {squareMeters, number} Quadrametern eine Kaltmiete von {mietlimbo, number, currency} Euro ergibt."
          values={{
            squareMeters: this.props.data.squareMeters,
              ...this.props.data.result
          }} />
      </p>

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

      <h3><FormattedMessage id="FinalResult.previousRentTitle" defaultMessage="Vormiete" /></h3>
      <p>{previousRentCase}</p>

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