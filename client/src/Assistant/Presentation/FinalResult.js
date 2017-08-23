// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl } from 'react-intl';

import { stageNameTranslations, featureGroupNames } from "../Assistant";
import Mietwucher from "./Mietwucher";
import RenovationCase from "./RenovationCase";
import {groupBalance} from "../ApartmentFeatureInputs/RangeSelectionGroup";
import FeatureShortnames from "../ApartmentFeatureInputs/FeatureShortnames";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { blue500, pinkA200 } from 'material-ui/styles/colors';

type FinalResultProps = {
  [string]: {
    negative: Array<string>,
    positive: Array<string>
  }
};

class FinalResult extends React.Component {
  inputName: "FinalResult";

  state: {
    balance: number,
    localRentLevel: number,
    mpbRent: number,
    mpbRentLevel: number
  };

  constructor(props: FinalResultProps) {
    super(props);
    autoBind(this);
    this.state = this.update(false);
  }

  componentWillMount() {
    this.props.changed({"FinalResult": this.props.data.squareMeters * (this.state.localRentLevel * 1.1)})
  }

  update(passOn=true) {
    // To calculate balance, for every group with predominantly positive features 1 is added,
    // for predominantly negative groups 1 is subtracted
    const balance = featureGroupNames
      .map(group => groupBalance(this.props.data[group]) < 0 ? -1 : groupBalance(this.props.data[group]) === 0 ? 0 : 1)
      .reduce((a, b) => (a + b), 0);

    const localRentLevel = balance >= 0 
      ? this.props.data.intermediateResult.mid + (parseFloat(balance) / 5) * (this.props.data.intermediateResult.max - this.props.data.intermediateResult.mid)
      : this.props.data.intermediateResult.mid + (parseFloat(balance) / 5) * (this.props.data.intermediateResult.mid - this.props.data.intermediateResult.min);

    // Rent may be 10% above local rent level
    const mpbRentLevel = localRentLevel * 1.1;
    const mpbRent = mpbRentLevel * this.props.data.squareMeters;

    if (passOn) this.props.changed({[this.inputName]: mpbRentLevel});

    return {
      localRentLevel, 
      mpbRentLevel,
      mpbRent,
      balance
    };
  }

  renderTableRows() {
    const rangeFeatures = featureGroupNames.map(group => <TableRow key={group}>
        <TableRowColumn><FormattedMessage {...stageNameTranslations[group]} /></TableRowColumn>
        <TableRowColumn>{this.props.data[group].positive.map(n => <p key={n}><FormattedMessage {...FeatureShortnames[n]} /></p>)}</TableRowColumn>
        <TableRowColumn>{this.props.data[group].negative.map(n => <p key={n}><FormattedMessage {...FeatureShortnames[n]} /></p>)}</TableRowColumn>
        <TableRowColumn style={{color: (groupBalance(this.props.data[group]) < 0 ? blue500 : groupBalance(this.props.data[group]) > 0 ? pinkA200 : "black"), "whiteSpace": "normal"}}>
           {(groupBalance(this.props.data[group]) < 0 ? "Überwiegend mietsenkend" : (groupBalance(this.props.data[group]) === 0 ? "Neutral" : "Überwiegend mietsteigernd"))} ({groupBalance(this.props.data[group])})
        </TableRowColumn>
      </TableRow>
    );
    return rangeFeatures;
  }

  render() {
    const calculationMessage = this.state.balance === 0
      ? <FormattedMessage
          id="FinalResult.calculationBalanced"
          defaultMessage="In deinem Fall halten sich positive und negative Merkmalgruppen die Waage. Hierdurch gilt direkt
            die ortsübliche Vergleichsmiete  aus dem ersten Teil von {localRentLevel, number} € pro Quadratmeter."
          values={{
            localRentLevel: this.state.localRentLevel
          }} />
      : this.state.balance < 0
        ? <FormattedMessage
            id="FinalResult.calculationNegative"
            defaultMessage="Insgesamt überwiegen Gruppen mit negativen (mietsenkenden) Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
              Wert der Spanneneinordnung {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum Minimalwert der Spanne abgezogen. Hierdurch ergibt sich
              die ortsübliche Vergleichsmiete {localRentLevel, number} € pro Quadratmeter."
            values={{
              balance: this.state.balance,
              balanceAbs: Math.abs(this.state.balance),
              correctionPercentage: Math.abs(this.state.balance) * 20,
              localRentLevel: this.state.localRentLevel
          }} />
        : <FormattedMessage
            id="FinalResult.calculationPositive"
            defaultMessage="Insgesamt überwiegen Gruppen mit positiven (mietsteigernden) Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
              Wert der Spanneneinordnung {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum Maximalwert der Spanne abgezogen. Hierdurch ergibt sich
              die ortsübliche Vergleichsmiete {localRentLevel, number} € pro Quadratmeter."
            values={{
              balance: this.state.balance,
              balanceAbs: Math.abs(this.state.balance),
              correctionPercentage: Math.abs(this.state.balance) * 20,
              localRentLevel: this.state.localRentLevel
          }} />;

    const isPreviousRentLimiting = this.props.data.previousRent > this.props.data.squareMeters * (this.state.localRentLevel * 1.1);
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
      <h1><FormattedMessage id="FinalResult.calculationTitle" defaultMessage="Dein mietlimbo: {result, number, currency} 😱" values={{result: this.state.mpbRent}} /></h1>
      <p><FormattedMessage
        id="FinalResult.tableDescription"
        defaultMessage="Das könnte deine Miete sein! Aber zunächst von vorne: In dieser Tabelle siehst du nochmal alle von dir gewählten Merkmale. In der rechten Spalte wird für jede Merkmalgruppe gezeigt, 
          ob positive oder negative Merkmale überwiegen. Ganz unten rechts wird daraus wiederum die Balance aller Merkmalgruppen berechnet." />
      </p>
      <Table selectable={false} style={{border: "1px solid #eee", tableLayout: "fixed"}}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn><FormattedMessage id="FinalResult.tableHeaderFeatures" defaultMessage="Merkmalgruppe" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="FinalResult.tableHeaderPositive" defaultMessage="Pos. Merkmale" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="FinalResult.tableHeaderNegative" defaultMessage="Neg. Merkmale" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="FinalResult.tableHeaderBalance" defaultMessage="Balance" /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderTableRows()}
          <TableRow style={{backgroundColor: "#f3f3f3"}}>
            <TableRowColumn>
              <FormattedMessage id="FinalResult.SummaryTotal" defaultMessage="Zusammen" />
            </TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>{(this.state.balance < 0 ? "-" + Math.abs(this.state.balance) + " Gruppen" : (this.state.balance > 0 ? "+" + this.state.balance + " Gruppen" : "neutral"))}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>

      <p>
        {calculationMessage}
      </p>

      <p>
        <FormattedMessage 
          id="FinalResult.prediction"
          defaultMessage="Nach einem Zuschlag von 10% auf die örtliche Vergleichsmiete ergibt sich
            für die beschriebene Wohnung ein maximaler Quadratmeterpreis von {mpbRentLevel, number} €, was bei einer Wohnungsgröße
            von {squareMeters, number} Quadrametern eine Kaltmiete von {mpbRent, number, currency} Euro ergibt."
          values={{
            mpbRentLevel: this.state.localRentLevel * 1.1,
            mpbRent: this.props.data.squareMeters * (this.state.localRentLevel * 1.1),
            squareMeters: this.props.data.squareMeters
          }} />
      </p>

      <p>
        <FormattedMessage
          id="FinalResult.comparison"
          defaultMessage="Das sind jeden Monat {diff, number, currency} {diffDir} als du jetzt zahlst."
          values={{
            mpbRent: this.props.data.squareMeters * (this.state.localRentLevel * 1.1),
            currentRent: this.props.data.rent,
            diff: Math.abs(this.props.data.rent - (this.props.data.squareMeters * (this.state.localRentLevel * 1.1))),
            diffDir: this.props.data.rent - (this.props.data.squareMeters * (this.state.localRentLevel * 1.1)) < 0 ? 'mehr' : 'weniger'
          }} />
      </p>

      <RenovationCase
        renovationInput={this.props.data.renovation}
        rent={this.props.data.rent}
        mpbRent={this.props.data.FinalResult} />

      <h3><FormattedMessage id="FinalResult.previousRentTitle" defaultMessage="Vormiete" /></h3>
      <p>{previousRentCase}</p>

      <Mietwucher 
        rent={this.props.data.rent}
        mpbRent={this.props.data.FinalResult} />

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