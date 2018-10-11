// @flow

import React from 'react'
import autoBind from 'react-autobind'
import { FormattedMessage, injectIntl } from 'react-intl'

import type {Data} from '../Assistant'
import Mietwucher from './Mietwucher'
import RenovationCase from './RenovationCase'
import FeatureTable from './FeatureTable'

import { 
  LocalRentLevel, 
  Mietpreisbremse,
  PreviousRentCase 
} from './Calculation'

type FinalResultProps = {
  data: Data,
  changed: Function
};

class FinalResult extends React.Component {
  inputName: "FinalResult";

  constructor(props: FinalResultProps) {
    super(props)
    autoBind(this)
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
        <p>
          <FormattedMessage
            id="FinalResult.recommendations"
            defaultMessage="Um herauszufinden, wie du mit dieser Information deine Miete senken kannst empfehle ich dir, 
              den Artikel von {ChristopherStark} zu lesen, der diese Seite inspiriert hat. Um es kurz zusammenzufassen,
              die Schritte sind üblicherweise:"
            values={{
              ChristopherStark: <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://blog.mietlimbo.de/2017/04/18/mietpreisbremse-betaetigen/">
                  Christopher Stark
              </a>
            }} />
        </p>
        <p>
          <ul>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep1"
              defaultMessage="Mieterverein beitreten für Rückfragen und individuelle Enschätzung"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep2"
              defaultMessage="Termin vereinbaren, mietlimbo Ergebnis ausgedruckt mitbringen (nächste Seite)"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep3"
              defaultMessage="Dem Vermieter eine qualifizierte Rüge schicken"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep4"
              defaultMessage="Antwort abwarten und dann damit zum Mieterverein gehen"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep5"
              defaultMessage="Weiter mit Vermieter verhandeln"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep6"
              defaultMessage="Ggf. mit Mieterverein-Anwalt drohen und den Fall übergeben"
            /></li>
            <li><FormattedMessage 
              id="FinalResult.recommendationStep7"
              defaultMessage="Nach Einigung Anhang zum Mietvertrag unterschreiben und weniger Miete zahlen"
            /></li>
          </ul>
        </p>
        
        <p>
          <FormattedMessage
            id="FinalResult.transition"
            defaultMessage="Auf der nächsten Seite findest
            du noch eine Übersicht aller Daten, die du ausdrucken und zu einer Rechtsberatung mitnehmen kannst." />
        </p>
      </section>
    </div>
  }
}

export default injectIntl(FinalResult)