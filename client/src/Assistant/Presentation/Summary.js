// @flow

import React from 'react';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';

import {isPreviousRentLimiting} from "./Calculation";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FeatureTable from "./FeatureTable";
import type {Data} from "../Assistant";

// Hide certain elements when printing
import './Summary.css';

type SummaryProps = {
  data: Data,
  intl: any
};

const messages = defineMessages({
  Title: {
    id: "Summary.title",
    defaultMessage: "Mietpreisbremse"
  },
  Description: {
    id: "Summary.description",
    defaultMessage: `Auf dieser Seite sind alle Daten zusammengefasst, die für
      deine Mietpreisbremse relevant sind. Du kannst diese ausdrucken und hiermit 
      zu einem Mieterverein oder Anwalt gehen, um dich zu deiner Situation beraten 
      zu lassen oder selbst eine qualifizierte Mietrüge verfassen und an deinen Vermieter schicken.`
  },
  ExceptionsTitle: {
    id: "Summary.ExceptionsTitle",
    defaultMessage: "Hinweise"
  },
  RangeSelectionTitle: {
    id: "Summary.RangeSelectionTitle",
    defaultMessage: "Mietspiegel"
  },
  FeatureTableTitle: {
    id: "Summary.FeatureTableTitle",
    defaultMessage: "Spanneneinordnung"
  },
  CalculationTitle: {
    id: "Summary.CalculationTitle",
    defaultMessage: "Anwendung nach Mietpreisbremse"
  },
  Footer: {
    id: "Summary.Footer",
    defaultMessage: "Diese Daten wurden auf mietlimbo.de erfasst - kostenlose Erfassung und Berechnung von Daten für die Mietpreisbremse"
  }
});

const Summary = injectIntl((props: SummaryProps) => {
  const styles = {
    table: {border: "1px solid #eee", tableLayout: "fixed"}
  }

  const values = {
    LeaseCreated: props.intl.formatDate(props.data.leaseCreated)
  };

  return <div className="summary">
    <h1><FormattedMessage {...messages.Title} /></h1>

    <p className="summaryExplanation"><FormattedMessage {...messages.Description} /></p>

    <h2><FormattedMessage {...messages.ExceptionsTitle} /></h2>
    <ul>
      <li>
        <FormattedMessage 
          id="Summary.LeaseCreated" 
          defaultMessage="Mietvertrag abgeschlossen: {LeaseCreated}" 
          values={values} />
      </li>
      <li>
        { props.data.newBuilding === false
          ? <FormattedMessage
              id="Summary.NewBuildingTrue"
              defaultMessage="Kein Erstmieter in Neubau" />
          : <FormattedMessage
              id="Summary.NewBuildingFalse"
              defaultMessage="Erstmieter in Neubau" />
        }
      </li>
      <li>
        { props.data.renovation === "none"
          ? <FormattedMessage
              id="Summary.NewBuildingTrue"
              defaultMessage="Keine Umfassende Renovierung oder Sanierung" />
          : <FormattedMessage
              id="Summary.NewBuildingFalse"
              defaultMessage="Renovierung/Sanierung muss berücksichtigt werden" />
        }
      </li>
      <li>
        { props.data.previousRent === -1 
          ? <FormattedMessage
                id="Summary.PreviousRentLow"
                defaultMessage="Vorherige Miete unbekannt" />
          : isPreviousRentLimiting(props.data)
            ? <FormattedMessage
                id="Summary.PreviousRentLow"
                defaultMessage="Vorherige Miete liegt über ortsübliche Vergleichsmiete + 10%" />
            : <FormattedMessage
                id="Summary.NewBuildingFalse"
                defaultMessage="Vorherige Miete liegt unter ortsübliche Vergleichsmiete + 10%" />
        }
      </li>
    </ul>

    <p>
      <h2><FormattedMessage {...messages.RangeSelectionTitle} /></h2>
      <Mietspiegel {...props.data} />
    </p>

    <p>
      <h2><FormattedMessage {...messages.FeatureTableTitle} /></h2>
      <FeatureTable {...props.data} />
    </p>

    <p>
      <h2><FormattedMessage {...messages.CalculationTitle} /></h2>

    </p>

    <p>
      <FormattedMessage {...messages.Footer} />
    </p>
  </div>
});

const Mietspiegel = (props: Data) => {
  return <table>
    <tr>
      <td><FormattedMessage id="Summary.MietspiegelStreet" defaultMessage="Straße" />:</td>
      <td>{props.address.streetname}</td>
    </tr>
    <tr>
      <td><FormattedMessage id="Summary.MietspiegelStreetRange" defaultMessage="Hausnummer" />:</td>
      <td>{props.address.range}</td>
    </tr>
    <tr>
      <td><FormattedMessage id="Summary.MietspiegelConstructionDate" defaultMessage="Gebäudealter" />:</td>
      <td>{props.constructionDate}</td>
    </tr>
    <tr>
      <td><FormattedMessage id="Summary.MietspiegelSquareMeters" defaultMessage="Wohnfläche" />:</td>
      <td>{props.squareMeters} qm</td>
    </tr>
    <tr>
      <td><FormattedMessage id="Summary.MietspiegelRentRange" defaultMessage="Nettokaltmiete (Spanne)" />:</td>
      <td>{props.result.min} - <strong>{props.result.mid}</strong> - {props.result.max}</td>
    </tr>
  </table>
}

export default injectIntl(Summary);