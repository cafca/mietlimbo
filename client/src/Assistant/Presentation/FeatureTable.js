// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { blue500, pinkA200 } from 'material-ui/styles/colors';

import FeatureShortnames from "../ApartmentFeatureInputs/FeatureShortnames";
import { groupBalance} from "../ApartmentFeatureInputs/RangeSelectionGroup";
import type {Data} from "../Assistant";
import { stageNameTranslations, featureGroupNames } from "../Assistant";

class FeatureTable extends React.Component {
  constructor(props: Data) {
    super(props);
    autoBind(this);
  }

  renderTableRows() {
    return featureGroupNames.map(group => <TableRow key={group}>
      <TableRowColumn>
        <FormattedMessage {...stageNameTranslations[group]} />
      </TableRowColumn>
      <TableRowColumn>
        {this.props[group].positive.map(n => 
          <p key={n}><FormattedMessage {...FeatureShortnames[n]} /></p>
        )}
      </TableRowColumn>
      <TableRowColumn>{this.props[group].negative.map(n => <p key={n}><FormattedMessage {...FeatureShortnames[n]} /></p>)}</TableRowColumn>
      <TableRowColumn style={{color: (groupBalance(this.props[group]) < 0 ? blue500 : groupBalance(this.props[group]) > 0 ? pinkA200 : "black"), "whiteSpace": "normal"}}>
         {(groupBalance(this.props[group]) < 0 ? "Überwiegend mietsenkend" : (groupBalance(this.props[group]) === 0 ? "Neutral" : "Überwiegend mietsteigernd"))} ({groupBalance(this.props[group])})
      </TableRowColumn>
    </TableRow>);
  }

  render() {
    return <Table selectable={false} style={{border: "1px solid #eee", tableLayout: "fixed"}}>
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
          <TableRowColumn>{(this.props.result.featureGroupBalance < 0 ? "-" + Math.abs(this.props.result.featureGroupBalance) + " Gruppen" : (this.props.result.featureGroupBalance > 0 ? "+" + this.props.result.featureGroupBalance + " Gruppen" : "neutral"))}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  }
}

export default injectIntl(FeatureTable);