// @flow

import React from 'react';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import { radioDescriptions } from "../GenericInputs/ConstructionDateInput";
import { officialDescriptions } from "../GenericInputs/BaseFeaturesInput";

import { isPreviousRentLimiting } from "./Calculation";

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
  legalNote: {
    id: "Summary.LegalNote",
    defaultMessage: `Beachte 
        bitte, dass Mietlimbo keine Rechtsberatung ist und eine Rechtsberatung 
        auch nicht ersetzen kann. Ich stelle dir hier kostenfrei nach meinen Möglichkeiten 
        korrekte und vollständige Informationen über die Mietpreisbremse zur Verfügung. 
        Ich übernehme allerdings keine Gewähr für die Richtigkeit, Vollständigkeit 
        und Aktualität der Informationen. `
  },
  Footer: {
    id: "Summary.Footer",
    defaultMessage: "Diese Daten wurden mit mietlimbo.de erfasst - der kostenlose Online-Assistent für die Mietpreisbremse."
  },
  Currency: {
    id: "Summary.GenericCurrency",
    defaultMessage: "{value, number, currency}"
  }
});

const styles = {
  mainWrapper: {
    fontSize: 16,
    padding: "10px 20px",
    width: "110%",
    marginLeft: "-5%",
    marginBottom: "2em"
  },
  rangeTable1: {
    textAlign: "center",
    border: "1px solid #ccc"
  },
  rangeTable: {
    borderCollapse: "collapse",
    width: "100%",
    marginBottom: "2em"
  },
  rangeTableCell1: {
    width: "33%",
    float: "left"
  },
  rangeTableCell2: {
    width: "33%"
  },
  rangeTableCell3: {
    width: "33%",
    float: "right"
  },
  rangeTable2: {
    width: "50%",
    textAlign: "center",
    border: "1px solid #ccc"
  }
};

const Summary = injectIntl((props: SummaryProps) => {
  const values = {
    LeaseCreated: props.intl.formatDate(props.data.leaseCreated)
  };

  return <Paper className="summary" style={styles.mainWrapper} >
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

    <h2><FormattedMessage {...messages.RangeSelectionTitle} /></h2>
    <Mietspiegel {...props.data} />

    <h2><FormattedMessage {...messages.FeatureTableTitle} /></h2>
    <FeatureTable {...props.data} officialNames={true} />

    <h2><FormattedMessage {...messages.CalculationTitle} /></h2>
    <MietpreisbremseSummary {...props.data} />

    <Divider />

    <p><FormattedMessage {...messages.Footer} /></p>
    <p><FormattedMessage {...messages.legalNote} /></p>
  </Paper>
});

const Mietspiegel = injectIntl((props: Data) => {
  const styles = {
    td: {paddingRight: 10}
  };

  const rangeIsModified = (props.baseFeatures !== "default" )
    && (["Pre1918", "Pre1949", "Pre1964"].indexOf(props.constructionDate) >= 0);

  const modifiedRangeNotice = rangeIsModified
    ? <p>
        <FormattedMessage 
          id="Summary.ModifiedRangeNotice"
          defaultMessage="Spanne wurde aufgrund von Bezugsfertigkeit {constructionDate} 
            und Ausstattung {baseFeatures} reduziert (siehe Anmerkungen im 
            Berliner Mietspiegel 2017, Seite 12)."
          values={{
            constructionDate: <em><FormattedMessage {...radioDescriptions[props.constructionDate]} /></em>,
            baseFeatures: <em><FormattedMessage {...officialDescriptions[props.baseFeatures]} /></em>
          }} 
        />
      </p>
    : null;

  return <div>
    <table>
      <tbody>
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
          <td><FormattedMessage {...radioDescriptions[props.constructionDate]} /></td>
        </tr>
        <tr>
          <td><FormattedMessage id="Summary.MietspiegelSquareMeters" defaultMessage="Wohnfläche" />:</td>
          <td>{props.squareMeters} qm</td>
        </tr>
        <tr>
          <td style={styles.td}><FormattedMessage id="Summary.MietspiegelRentRange" defaultMessage="Spanne Nettokaltmiete" />:</td>
          <td>
            <FormattedMessage {...messages.Currency} values={{value: props.result.min}} />
            &nbsp; - &nbsp; 
            <strong><FormattedMessage {...messages.Currency} values={{value: props.result.mid}} /></strong> 
            &nbsp; - &nbsp; 
            <FormattedMessage {...messages.Currency} values={{value: props.result.max}} />
          </td>
        </tr>
      </tbody>
    </table>
    {modifiedRangeNotice}
  </div>
});

const MietpreisbremseSummary = (props: Data) => {
  const lowerRange = props.result.mid - props.result.min;
  const upperRange = props.result.max - props.result.mid;
  const range = props.result.featureGroupBalance > 0 ? upperRange : lowerRange;
  const sign = props.result.featureGroupBalance < 0 ? "-" : "+";
  const correctionPercentage = Math.abs(props.result.featureGroupBalance) * 20
  const correctionAmount = props.result.featureGroupBalance === 0
    ? 0
    : props.result.featureGroupBalance > 0
      ? upperRange * (correctionPercentage / 100.0)
      : lowerRange * (correctionPercentage / 100.0);

  const values={
    lowerRange,
    upperRange,
    range,
    sign,
    correctionPercentage,
    correctionAmount,
    squareMeters: props.squareMeters,
    ...props.result
  };

  return <div>
    <table style={styles.rangeTable}>
      <tbody>
        <tr>
          <td colSpan="2" style={styles.rangeTable1}>
            <span style={styles.rangeTableCell1}><FormattedMessage id="Summary.RangeMid" defaultMessage="Unterwert: {min, number, currency}" values={values} /></span>
            <span style={styles.rangeTableCell2}><FormattedMessage id="Summary.RangeMid" defaultMessage="Mittelwert: {mid, number, currency}" values={values} /></span>
            <span style={styles.rangeTableCell3}><FormattedMessage id="Summary.RangeMid" defaultMessage="Oberwert: {max, number, currency}" values={values} /></span>
          </td>
        </tr>
        <tr>
          <td style={styles.rangeTable2}><FormattedMessage id="Summary.RangeMid" defaultMessage="< Spanne {lowerRange, number, currency} >" values={values} /></td>
          <td style={styles.rangeTable2}><FormattedMessage id="Summary.RangeMid" defaultMessage="< Spanne {upperRange, number, currency} >" values={values} /></td>
        </tr>
        <tr>&nbsp;</tr>
        <tr>
          <td><FormattedMessage id="Summary.correction" defaultMessage="Korrektur" />:</td>
          <td>
            {props.result.featureGroupBalance === 0 
              ? "/"
              :<FormattedMessage 
                id ="Summary.correctionCalc" 
                defaultMessage="{correctionPercentage, number}% × {range, number, currency} = {correctionAmount, number, longCurrency}" 
                values={values} />
            }
          </td>
        </tr>
        <tr>
          <td><FormattedMessage id="Summary.localRentLevel" defaultMessage="Örtliche Vergleichsmiete" />:</td>
          <td><FormattedMessage 
            id="Summary.localRentLevelCalc" 
            defaultMessage="{mid, number, currency} {sign} {correctionAmount, number, longCurrency} = {localRentLevel, number, longCurrency}" 
            values={values} />
          </td>
        </tr>
        <tr>
          <td><FormattedMessage id="Summary.mpbApplied" defaultMessage="Bei Anwendung von Mietpreisbremse" />:</td>
          <td><FormattedMessage id ="Summary.mpbAppliedCalc" values={values}
            defaultMessage="{localRentLevel, number, longCurrency} × 1,1 = {mietlimboLevel, number, longCurrency}" /></td>
        </tr>
        <tr>
          <td><FormattedMessage id="Summary.mpbFinalRent" defaultMessage="Nettokaltmiete für {squareMeters, number} ㎡" values={values} />:</td>
          <td><FormattedMessage id ="Summary.mpbFinalRentCalc" values={values}
            defaultMessage="{mietlimboLevel, number, longCurrency}/㎡ × {squareMeters, number} ㎡ ≈ {mietlimbo, number, currency}" /></td>
        </tr>
      </tbody>
    </table>
  </div>
}

export default injectIntl(Summary);