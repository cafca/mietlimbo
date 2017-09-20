// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import type {AssistantInputProps} from '../Types';
import MietspiegelTable from "./MietspiegelTable";

import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

type RentData = {
  max: number,
  mid: number,
  min: number,
  warnings: ?string
};

type RentDataSet = {
  default: RentData,
  both: ?RentData,
  either: ?RentData
};

const messages = defineMessages({
  loading: {
    id: "Mietspiegel.loading",
    defaultMessage: "Mietspiegelabfrage..." 
  },
  success: {
    id: "Mietspiegel.success",
    defaultMessage: `Erster Teil fertig!`
  },
  info: {
    id: "Mietspiegel.info",
    defaultMessage: `Die mittlere ortsübliche Vergleichsmiete beträgt 
    {mid, number, currency}. Je nach Ausstattung von Wohnung, Gebäude und Umfeld 
    wird zu diesem Mittelwert noch etwas aufgerechnet oder abgezogen. 
    Dadurch kann die örtliche Vergleichsmiete zu deiner Wohnung zwischen 
    {min, number, currency} und {max, number, currency} pro Quadratmeter 
    liegen.`
  },
  infoApplied: {
    id: "Mietspiegel.rangeApplied",
    defaultMessage: `Bei {squareMeters, number} Quadratmeter Grundfläche 
    entspricht dies nach Anwendung der Mietpreisbremse einer Kaltmiete 
    zwischen {minApplied, number, currency} und maximal {maxApplied, number, currency}.`
  },
  encouragement: {
    id: "Mietspiegel.encouragement",
    defaultMessage: `Um herauszufinden wo genau du auf dieser Spanne liegst,
      kannst du jetzt im zweiten Schritt dieses Assistenten Fragen aus 
      fünf Kategorien beantworten. Mit den Antworten wird eine genaue Einordnung
      im Mietspiegelfeld ermöglicht. Du kannst jederzeit oben auf AUSWERTUNG klicken,
      um das Ergebnis der Berechnung zu sehen und danach mit Klick auf eine der 
      fünf Kategorien mit der Beantwortung der Fragen weitermachen.`
  },
  insufficientData: {
    id: "Mietspiegel.insufficientData",
    defaultMessage: `Leider gibt es im aktuellen Berliner Mietspiegel nicht 
      genug Daten über Wohnungen wie deine. Ohne Daten aus dem Mietspiegel 
      kann dir dieser Assistent leider nicht genau bei der Einordnung deiner Wohnung 
      weiterhelfen. Je nach individueller Situation kann ein Mieterverein 
      mit einer persönlichen Beratung weiterhelfen.`
  },
  insufficientDataTitle: {
    id: "Mietspiegel.insufficientDataTitle",
    defaultMessage: "Nicht genug Daten im Mietspiegel"
  },
  connectionError: {
    id: "Mietspiegel.connectionError",
    defaultMessage: `Es gab leider einen Fehler beim Laden der Daten. Bitte 
      überprüfe deine Internetverbindung oder warte eine Weile.`
  },
  retry: {
    id: "Mietspiegel.retry",
    defaultMessage: "Nochmal probieren, los!"
  }
});

class Mietspiegel extends React.Component {
  state: {
    data: ?RentData,
    state: string
  };

  inputName = "mietspiegel"
  serverURL : string; // set in constructor

  states = {
    LOADING: "Requesting rent level data",
    SUCCESS: "Sufficient data",
    INSUFFICIENT_DATA: "Insufficient data to proceed",
    ERROR: "There was an error retrieving results"
  }

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      state: this.states.LOADING,
      data: null
    }
    this.serverURL = process.env.NODE_ENV === "production" 
      ? "https://mietlimbo.de:8000" : "http://localhost:8000";
  }

  componentDidMount() {
    this.loadRentData();
  }

  loadRentData() {
    this.setState({state: this.states.LOADING});

    fetch(this.serverURL + "/api/v1/range", {
        method: "POST",
        headers: new Headers({"Content-Type": "Application/JSON"}),
        body: JSON.stringify({
          street_id: this.props.address.id,
          year_range: this.props.constructionDate,
          real_size: this.props.squareMeters,
          guessed_size: this.props.squareMetersGuessed
        })
      })
      .then(resp => {console.log(resp); return resp.json()})
      .then(respData => {
        if (respData.errors != null && respData.errors.length > 0) {
          // Handle error response
          console.error(respData.errors);
          this.setState({state: this.states.ERROR})
          this.props.valid(this.inputName, false);
        } else {
          // Select the right dataset from the API response depending on the
          // apartment's base configuration
          const data = this.selectDataset(respData.data)

          // Case where Mietspiegel does not provide sufficient data
          if (respData.data.default.warnings 
              && respData.data.default.warnings.indexOf("***") >= 0) 
          {
            this.setState({data: null, state: this.states.INSUFFICIENT_DATA})
            this.props.valid(this.inputName, false);

          // Update state on success
          } else {
            this.props.changed({result: data}, () => {
              this.setState({data, state: this.states.SUCCESS})
              this.props.valid(this.inputName, true);
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({state: this.states.ERROR});
      });
  }

  selectDataset(data: RentDataSet) {
    // For configurations 'noheating' and 'nobath', the 'either' set is selected. Otherwise,
    // props.baseFeatures determines the selected set.
    const baseConfiguration = ["noheating", "nobath"].indexOf(this.props.baseFeatures) >= 0 
      ? "either" : this.props.baseFeatures;
    return Object.keys(data).indexOf(baseConfiguration) >= 0 
      ? data[baseConfiguration] : data["default"];
  }

  render() {
    let content = "";
    let title = "";

    switch (this.state.state) {
      case this.states.LOADING:
        title = <p><FormattedMessage {...messages.loading} /></p>;
        content = <LinearProgress />;
        break;

      case this.states.SUCCESS:
        const rentData = {
          squareMeters: this.props.squareMeters,
          minApplied: this.props.squareMeters * this.state.data.min * 1.1,
          maxApplied: this.props.squareMeters * this.state.data.max * 1.1
        };

        title = <FormattedMessage {...messages.success} />;
        content = <div>
          <MietspiegelTable {...this.props} />
          <p><FormattedMessage {...messages.info} values={this.state.data} /></p>
          <p><FormattedMessage {...messages.infoApplied} values={rentData} /></p>
          <p><FormattedMessage {...messages.encouragement} /></p>
        </div>;
        break;

      case this.states.INSUFFICIENT_DATA:
        title = <FormattedMessage {...messages.insufficientDataTitle} />;
        content = <p><FormattedMessage {...messages.insufficientData} /></p>;
        break;

      case this.states.ERROR:
      default:
        title = <FormattedMessage {...messages.connectionError} />;
        content = <div>
          <p><RaisedButton 
            label={this.props.intl.formatMessage(messages.retry)} 
            onClick={() => this.loadRentData()} />
          </p>
        </div>;
        break;
    }

    return <Card className="assistantInput">
      <CardTitle>
        {title}
      </CardTitle>
      <CardText>
        {content}
      </CardText>
    </Card>
  }
}

export default injectIntl(Mietspiegel);