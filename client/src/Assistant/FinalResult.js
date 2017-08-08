// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';

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
    this.state = this.update();
  }

  componentDidMount() {
    this.props.changed({"FinalResult": this.props.data.squareMeters * (this.state.localRentLevel * 1.1)})
  }

  update() {
    // To calculate balance, for every group with predominantly positive features 1 is added,
    // for predominantly negative groups 1 is subtracted
    const balance = this.groups
      .map(group => this.props.data[group].balance < 0 ? -1 : this.props.data[group].balance === 0 ? 0 : 1)
      .reduce((a, b) => (a + b), 0);

    const localRentLevel = balance >= 0 
      ? this.props.data.intermediateResult.mid + (parseFloat(balance) / 10) * (this.props.data.intermediateResult.max - this.props.data.intermediateResult.mid)
      : this.props.data.intermediateResult.mid + (parseFloat(balance) / 10) * (this.props.data.intermediateResult.mid - this.props.data.intermediateResult.min);

    return {localRentLevel, balance};
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

      <p>
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
          }} />
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
    </div>;
  }
}

export default injectIntl(FinalResult);