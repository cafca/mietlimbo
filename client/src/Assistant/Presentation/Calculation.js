// @flow

import React from 'react';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';

import type {Data} from "../Assistant";



export const LocalRentLevel = (props: Data) => {
  const messages = defineMessages({
    LocalRentLevelTitle: {
      id: "Calculation.LocalRentLevelTitle",
      defaultMessage: `Örtliche Vergleichsmiete`
    },
    LocalRentLevelDescription: {
      id: "Calculation.LocalRentLevelDescription",
      defaultMessage: `Zur Berechnung der örtlichen Vergleichsmiete wird auf 
        den mittleren Wert der Spanne ({mid, number, currency}) ein Betrag 
        aufgerechnet oder abgezogen, der davon abhängt, wieviele der fünf 
        Merkmalgruppen bei dir überwiegend mietsteigernd, und wieviele 
        mietsenkend sind.`
    },
    calculationBalanced: {
      id: "Calculation.FeatureGroupsBalanced",
      defaultMessage: `In deinem Fall halten sich positive und negative 
      Merkmalgruppen die Waage. Hierdurch gilt der Mittelwert der Spanne von 
      {localRentLevel, number} € pro Quadratmeter direkt als örtliche 
      Vergleichsmiete.`
    },
    calculationNegative: {
      id: "Calculation.FeatureGroupsNegative",
      defaultMessage: `Insgesamt überwiegen bei dir Gruppen mit negativen 
        (mietsenkenden) Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
        Wert der Spanne {balanceAbs} * 20% = {correctionPercentage, number}% 
        der Differenz zum Minimalwert der Spanne abgezogen. Hierdurch ergibt 
        sich die ortsübliche Vergleichsmiete {localRentLevel, number} € pro 
        Quadratmeter.`
    },
    calculationPositive: {
      id: "Calculation.FeatureGroupsPositive",
      defaultMessage: `Insgesamt überwiegen Gruppen mit positiven (mietsteigernden) 
        Merkmalen um {balanceAbs}. Deshalb werden vom mittleren Wert der Spanne 
        {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum 
        Maximalwert der Spanne abgezogen. Hierdurch ergibt sich die ortsübliche 
        Vergleichsmiete {localRentLevel, number} € pro Quadratmeter.`
    }
  });

  let calculation = "";

  const result = {
    balanceAbs: Math.abs(props.result.featureGroupBalance),
    correctionPercentage: Math.abs(props.result.featureGroupBalance) * 20,
    ...props.result
  };

  const calculationMessage = props.result.featureGroupBalance === 0
    ? messages.calculationBalanced
    : props.result.featureGroupBalance < 0
      ? messages.calculationNegative
      : messages.calculationPositive;

  return <div>
    <h2><FormattedMessage {...messages.LocalRentLevelTitle} /></h2>
    <p><FormattedMessage {...messages.LocalRentLevelDescription} values={result} /></p>
    <p><FormattedMessage {...calculationMessage} values={result} /></p>
  </div>
};


export const Mietpreisbremse = (props: Data) => {
  const messages = defineMessages({
    mietlimboTitle: {
      id: "Calculation.mietlimboTitle",
      defaultMessage: "Mietpreisbremse"
    },
    mietlimboCalculation: {
      id: "Calculation.mietlimboCalculation",
      defaultMessage: `Die höchstzulässige Miete bei Anwendung der Mietpreisbremse 
        liegt genau 10% über der ortsüblichen Vergleichsmiete. Das sind in diesem 
        Fall {localRentLevel, number} €/qm + 10% = {mietlimboLevel, number} €/qm. 
        Für eine Wohnfläche von {squareMeters, number} qm ist als Kaltmiete also 
        zulässig: `
    },
    mietlimboResult: {
      id: "Calculation.mietlimboResult",
      defaultMessage: `{mietlimboLevel, number} €/qm * {squareMeters, number} 
        qm ≈ {mietlimbo, number, currency}.`
    }
  });

  let rv = "";

  const result = {
    squareMeters: props.squareMeters,
    ...props.result
  };

  return <div>
    <h2><FormattedMessage {...messages.mietlimboTitle} /></h2>
    <p><FormattedMessage {...messages.mietlimboCalculation} values={result} /></p>
    <p><strong><FormattedMessage {...messages.mietlimboResult} values={result} /></strong></p>
  </div>
};

// Mietpreisbremse cannot be applied if previous rent was already above 
// the targeted rent 
export const isPreviousRentLimiting = (data: Data) => 
  data.previousRent && data.previousRent > data.result.mietlimbo;

export const PreviousRentCase = (props: Data) => {
  const messages = defineMessages({
    previousRentTitle: {
      id: "Calculation.previousRentTitle",
      defaultMessage: "Vormiete"
    },
    previousRentUnknown: {
      id: "Calculation.previousRentUnknown",
      defaultMessage: `Denk daran, dass du die Miete nicht niedriger senken 
        kannst, als die Miete des Vormieters war. Du hast angegeben, dass du diese 
        nicht kennst, also wäre jetzt ein guter Schritt, zu überlegen, ob es sich 
        bei diesem Ergebnis lohnen könnte, mal Nachforschungen dazu zu starten.`
    },
    previousRentLimiting: {
      id: "Calculation.previousRentLimiting",
      defaultMessage: `Dadurch, dass deine Vormieter schon eine höhere Miete 
        gezahlt haben, kannst du allerdings nur auf deren Miete von 
        {previousRent, number, currency} senken.`
    },
    previousRentNotLimiting: {
      id: "Calculation.previousRentNotLimiting",
      defaultMessage: `Die Miete deines Vormieters lag auch unter diesem Wert 
        und steht damit einer Mietsenkung nicht im Wege.`
    },
  });

  const message = props.previousRent === -1 ? messages.previousRentUnknown
    : isPreviousRentLimiting(props)
      ? messages.previousRentLimiting
      : messages.previousRentNotLimiting;

  return <div>
    <h3><FormattedMessage {...messages.previousRentTitle} /></h3>
    <FormattedMessage {...message} values={props} />
  </div>;
};