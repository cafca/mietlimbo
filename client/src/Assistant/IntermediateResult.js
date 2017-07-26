// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';

import type {AssistantInputProps} from '../InputComponents/Tools';

import RaisedButton from 'material-ui/RaisedButton';

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

class IntermediateResult extends React.Component {
  state: {
    data: ?RentData,
    state: string
  };

  inputName = "intermediateResult"
  apiEndpoint = "http://localhost:8000/api/v1/range"

  states = {
    LOADING: "Requesting rent level data",
    SUCCESS: "Sufficient data",
    INSUFFICIENT_DATA: "Insufficient data to proceed",
    ERROR: "There was an error retrieving results"
  }

  messages = defineMessages({
    loading: {
      id: "IntermediateResult.loading",
      defaultMessage: "Mietspiegelabfrage..." 
    },
    success: {
      id: "IntermediateResult.success",
      defaultMessage: `Es gibt im Berliner Mietspiegel genug Daten für 
        Wohnungen wie deine!`
    },
    info: {
      id: "IntermediateResult.info",
      defaultMessage: `Die ortsübliche Vergleichsmiete beträgt demnach 
      {mid, number, currency}. Je nachdem, wie gut deine Wohnung ausgestattet 
      ist, wird von diesem Wert noch etwas abgezogen oder dazugerechnet. 
      Dadurch kann der angemessene Mietpreis für eine Wohnung wie deine zwischen 
      {min, number, currency} und {max, number, currency} pro Quadratmeter 
      liegen.`
    },
    infoApplied: {
      id: "IntermediateResult.rangeApplied",
      defaultMessage: `Bei {squareMeters, number} Quadratmeter Grundfläche 
      entspricht dies einer Kaltmiete zwischen {minApplied, number, currency} 
      und {maxApplied, number, currency}.`
    },
    encouragement: {
      id: "IntermediateResult.encouragement",
      defaultMessage: `Lass uns das rausfinden! Hierfür frage ich dich 82 
      Fragen. Klingt viel, ist es auch. Macht nix, los!`
    },
    insufficientData: {
      id: "IntermediateResult.insufficientData",
      defaultMessage: `Leider gibt es im aktuellen Berliner Mietspiegel nicht 
        genug Daten über Wohnungen wie deine. Ohne Daten aus dem Mietspiegel 
        kann dir dieser Assistent leider nicht bei der Einordnung deiner Wohnung 
        weiterhelfen. Je nach individueller Situation kann ein Mieterverein wie 
        [NAME, KONTAKT] mit einer persönlichen Beratung weiterhelfen.`
    },
    connectionError: {
      id: "IntermediateResult.connectionError",
      defaultMessage: `Es gab leider einen Fehler beim Laden der Daten. Bitte 
        überprüfe deine Internetverbindung oder warte eine Weile.`
    },
    retry: {
      id: "IntermediateResult.retry",
      defaultMessage: "Nochmal probieren, los!"
    }
  })

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      state: this.states.LOADING,
      data: null
    }
  }

  componentDidMount() {
    this.loadRentData();
  }

  loadRentData() {
    this.setState({state: this.states.LOADING});

    fetch(this.apiEndpoint, {
        method: "POST",
        headers: new Headers({"Content-Type": "Application/JSON"}),
        body: JSON.stringify({
          street_id: this.props.address.id,
          year_range: this.props.constructionDateGuessed,
          real_size: this.props.squareMeters,
          guessed_size: this.props.squareMetersGuessed
        })
      })
      .then(resp => {console.log(resp); return resp.json()})
      .then(respData => {
        if (respData.errors != null && respData.errors.length > 0) {
          console.error(respData.errors);
          this.setState({state: this.states.ERROR})
          this.props.valid(this.inputName, false);
        } else {
          const data = this.selectDataset(respData.data)
          // Linter complains about '!=', but it is necessary to compare against both
          // null and undefined as possible values
          // eslint-disable-next-line
          const state = data != undefined ? this.states.SUCCESS : this.states.INSUFFICIENT_DATA
          this.setState({data, state});
          // eslint-disable-next-line
          this.props.valid(this.inputName, data != undefined);
          this.props.changed({[this.inputName]: data});
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
    const baseConfiguration = ["noheating", "nobath"].indexOf(this.props.baseFeatures) > 0 
      ? "either" : this.props.baseFeatures;
    return data != null && Object.keys(data).indexOf(baseConfiguration) > 0 
      ? data[baseConfiguration] : null;
  }

  render() {
    switch (this.state.state) {
      case this.states.LOADING:
        return <p><FormattedMessage {...this.messages.loading} /></p>;

      case this.states.SUCCESS:
        const rentData = {
          squareMeters: this.props.squareMeters,
          minApplied: this.props.squareMeters * this.state.data.min,
          maxApplied: this.props.squareMeters * this.state.data.max
        };

        return <div>
          <p><FormattedMessage {...this.messages.success} /></p>
          <p><FormattedMessage {...this.messages.info} values={this.state.data} /></p>
          <p><FormattedMessage {...this.messages.infoApplied} values={rentData} /></p>
          <p><FormattedMessage {...this.messages.encouragement} /></p>
        </div>;

      case this.states.INSUFFICIENT_DATA:
        return <p><FormattedMessage {...this.messages.insufficientData} /></p>;

      case this.states.ERROR:
      default:
        return <div>
          <FormattedMessage {...this.messages.connectionError} />
          <p><RaisedButton label={this.props.intl.formatMessage(this.messages.retry)} onTouchTap={() => this.loadRentData()} /></p>
        </div>;
    }
  }
}

export default injectIntl(IntermediateResult);