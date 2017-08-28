// @flow

import React from 'react';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import { radioDescriptions } from "../GenericInputs/ConstructionDateInput";
import { officialDescriptions } from "../GenericInputs/BaseFeaturesInput";

import type {Data} from "../Assistant";

const messages = defineMessages({
  perSquareMeter: {
    id: "Summary.GenericPerSquareMeter",
    defaultMessage: "{value, number, currency}/㎡"
  }
});

const MietspiegelTable = (props: Data) => {
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
            <FormattedMessage {...messages.perSquareMeter} values={{value: props.result.min}} />
            &nbsp; - &nbsp; 
            <strong><FormattedMessage {...messages.perSquareMeter} values={{value: props.result.mid}} /></strong> 
            &nbsp; - &nbsp; 
            <FormattedMessage {...messages.perSquareMeter} values={{value: props.result.max}} />
          </td>
        </tr>
      </tbody>
    </table>
    {modifiedRangeNotice}
  </div>
};

export default injectIntl(MietspiegelTable);