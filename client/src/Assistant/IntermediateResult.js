// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

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

  currentRentLevel() {
    // Linter complains about '!=', but it is necessary to compare against both
    // null and undefined as possible values
    // eslint-disable-next-line
    return this.state.state === this.states.SUCCESS && this.props.squareMeters != undefined 
      ? {
        rent: this.props.rent,
        rentLevel: (this.props.rent / this.props.squareMeters),
        squareMeters: this.props.squareMeters,
        minApplied: this.props.squareMeters * this.state.data.min,
        maxApplied: this.props.squareMeters * this.state.data.max
      } : null;
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
        return <p>
          <FormattedMessage
            id="IntermediateResult.loading"
            defaultMessage="Mietspiegelabfrage..." />
        </p>;

      case this.states.SUCCESS:
        // eslint-disable-next-line
        const currentLevel = this.currentRentLevel() != undefined ? <div>
          <p><FormattedMessage
            id="IntermediateResult.rangeApplied"
            defaultMessage="Bei {squareMeters, number} Quadratmeter Grundfläche entspricht dies einer Kaltmiete
            zwischen {minApplied, number, currency} und {maxApplied, number, currency}." 
            values={this.currentRentLevel()} /></p>
          <p><FormattedMessage
            id="IntermediateResult.currentRentLevel"
            defaultMessage="Momentan entspricht deine Kaltmiete von {rent, number, currency} einem Quadratmeterpreis 
            von {rentLevel, number, currency}." 
            values={this.currentRentLevel()} /></p>
        </div> : null;

        return <div>
          <p><FormattedMessage
            id="IntermediateResult.success"
            defaultMessage="Es gibt im Berliner Mietspiegel genug Daten für Wohnungen wie deine!"
          /></p>

          <p><FormattedMessage 
            id="IntermediateResult.info"
            defaultMessage="Die ortsübliche Vergleichsmiete beträgt demnach {mid, number, currency}. 
            Je nachdem, wie gut deine 
            Wohnung ausgestattet ist, wird von diesem Wert noch etwas abgezogen oder dazugerechnet. 
            Dadurch kann der angemessene Mietpreis für eine Wohnung wie deine zwischen 
            {min, number, currency} und {max, number, currency} pro Quadratmeter liegen." 
            values={this.state.data} /></p>

          {currentLevel}

          <p><FormattedMessage
            id="IntermediateResult.encouragement"
            defaultMessage="Lass uns das rausfinden! Hierfür frage ich dich 82 Fragen. 
            Klingt viel, ist es auch. Macht nix, los!" /></p>
        </div>;

      case this.states.INSUFFICIENT_DATA:
        return <p><FormattedMessage
          id="IntermediateResult.insufficient_data"
          defaultMessage="Leider gibt es im aktuellen Berliner Mietspiegel nicht genug Daten über Wohnungen 
          wie deine. Ohne Daten aus dem Mietspiegel kann dir dieser Assistent leider nicht bei der Einordnung
          deiner Wohnung weiterhelfen. Je nach individueller Situation kann ein Mieterverein wie [NAME, KONTAKT]
          mit einer persönlichen Beratung weiterhelfen." /></p>;

      case this.states.ERROR:
      default:
        return <div>
          <FormattedMessage
            id="IntermediateResult.success"
            defaultMessage="Es gab leider einen Fehler beim Laden der Daten. Bitte überprüfe deine Internetverbindung oder warte eine Weile."
          />
          <p><RaisedButton label="Retry" onTouchTap={() => this.loadRentData()} /></p>
        </div>;
    }
  }
}

export default IntermediateResult;