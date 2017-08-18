// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';

import Mietwucher from "./Mietwucher";
import RenovationCase from "./RenovationCase";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const groupNameTranslations = defineMessages({
  BathGroup: {
    id: "groupNames.BathGroup",
    defaultMessage: "Bad und WC"
  },
  KitchenGroup: {
    id: "groupNames.KitchenGroup",
    defaultMessage: "Küche"
  },
  ApartmentGroup: {
    id: "groupNames.ApartmentGroup",
    defaultMessage: "Wohnung"
  },
  BuildingGroup: {
    id: "groupNames.BuildingGroup",
    defaultMessage: "Gebäude"
  },
  EnvironmentGroup: {
    id: "groupNames.EnvironmentGroup",
    defaultMessage: "Umgebung"
  },
});

type FinalResultProps = {
  [string]: {
    balance: number,
    negative: Array<string>,
    positive: Array<string>
  }
};

class FinalResult extends React.Component {
  inputName: "FinalResult";
  groups = ["ApartmentGroup", "BathGroup", "BuildingGroup", "EnvironmentGroup", "KitchenGroup"];

  state: {
    balance: number,
    localRentLevel: number
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
    const balance = this.groups
      .map(group => this.props.data[group].balance < 0 ? -1 : this.props.data[group].balance === 0 ? 0 : 1)
      .reduce((a, b) => (a + b), 0);

    const localRentLevel = balance >= 0 
      ? this.props.data.intermediateResult.mid + (parseFloat(balance) / 10) * (this.props.data.intermediateResult.max - this.props.data.intermediateResult.mid)
      : this.props.data.intermediateResult.mid + (parseFloat(balance) / 10) * (this.props.data.intermediateResult.mid - this.props.data.intermediateResult.min);

    // Rent may be 10% above local rent level
    const mpbRentLevel = localRentLevel * 1.1;
    const mpbRent = mpbRentLevel * this.props.squareMeters;

    if (passOn) this.props.changed({[this.inputName]: mpbRentLevel});

    return {
      localRentLevel, 
      mpbRentLevel,
      mpbRent,
      balance
    };
  }

  renderTableRows() {
    const rangeFeatures = this.groups.map(group => <TableRow key={group}>
        <TableRowColumn><FormattedMessage {...groupNameTranslations[group]} /></TableRowColumn>
        <TableRowColumn>{this.props.data[group].positive.map(n => <p key={n}>{n}</p>)}</TableRowColumn>
        <TableRowColumn>{this.props.data[group].negative.map(n => <p key={n}>{n}</p>)}</TableRowColumn>
        <TableRowColumn style={{color: (this.props.data[group].balance < 0 ? "green" : this.props.data[group].balance > 0 ? "red" : "black")}}>
           {(this.props.data[group].balance < 0 ? "Mietsenkend" : (this.props.data[group].balance === 0 ? "Neutral" : "Mietsteigernd"))} ({this.props.data[group].balance})
        </TableRowColumn>
      </TableRow>
    );
    return rangeFeatures;
  }

  render() {
    const calculationMessage = this.state.balance !== 0 ? 
        <FormattedMessage
          id="FinalResult.calculation"
          defaultMessage="Insgesamt überwiegen Gruppen mit {balanceDirection} Merkmalen um {balanceAbs}. Deshalb werden vom mittleren 
            Wert der Spanneneinordnung {balanceAbs} * 20% = {correctionPercentage, number}% der Differenz zum Minimalwert abgezogen. Hierdurch ergibt sich
            die ortsübliche Vergleichsmiete {localRentLevel, number} € pro Quadratmeter."
          values={{
            balance: this.state.balance,
            balanceDirection: this.state.balance >= 0 ? "positiven" : "negativen",
            balanceAbs: Math.abs(this.state.balance),
            correctionPercentage: Math.abs(this.state.balance) * 20,
            localRentLevel: this.state.localRentLevel
          }} /> :
        <FormattedMessage
          id="FinalResult.calculationBalanced"
          defaultMessage="In deinem Fall halten sich positive und negative Merkmalgruppen die Waage. Hierdurch gilt direkt
            die ortsübliche Vergleichsmiete aus Schritt 3 von {localRentLevel, number} € pro Quadratmeter."
          values={{
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
            defaultMessage="Dadurch, dass dein Vormieter allerdings schon eine höhere Miete gezahlt hat, kannst du allerdings 
              nur auf {limit, number, currency} € senken."
            values={{limit: this.props.data.previousRent}} />
        : <FormattedMessage
            id="FinalResult.previousRentNotLimiting"
            defaultMessage="Die Miete deines Vormieters lag auch unter diesem Wert und steht damit einer Mietsenkung nicht im Wege." />;

    return <div>
      <p>Du hast es geschafft! Mit den erfassten Merkmalen kann jetzt die ortsübliche Vergleichsmiete für deine Wohnung ermittelt werden:</p>
      <p>Für jede der fünf Merkmalgruppen, in der überwiegend positive Merkmale ausgewählt wurden, werden jetzt auf den Mittelwert aus dem Mietspiegel
      20% der Differenz zum Maximalwert addiert, bzw. umgekehrt für negative Merkmale.</p>
      <Table selectable={false} style={{border: "1px solid #eee"}}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Merkmalgruppe</TableHeaderColumn>
            <TableHeaderColumn>Pos. Merkmale</TableHeaderColumn>
            <TableHeaderColumn>Neg. Merkmale</TableHeaderColumn>
            <TableHeaderColumn>Balance</TableHeaderColumn>
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
            <TableRowColumn>{(this.state.balance < 0 ? "+" + Math.abs(this.state.balance) + " negative Gruppen" : (this.state.balance > 0 ? "+" + this.state.balance + " positive Gruppen" : "neutral"))}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>

      <h2><FormattedMessage id="FinalResult.calculationTitle" defaultMessage="Ergebnis" /></h2>
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
            diff: this.props.data.rent - (this.props.data.squareMeters * (this.state.localRentLevel * 1.1)),
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