// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import type {RangeInputProps} from './RangeSelectionGroup';

import './Styles.css';

// 
// This class is a bit of a hack: All other features are boolean in that
// that they either apply or not, while energy is also boolean in that it either
// raises or lowers the rent, but also not boolean in that there are several 
// ranges into which energy consumption can fall as well as three options that
// modify these ranges.
// 
// To deal with this, two separate features 'EnergyGood' and 'EnergyBad' are
// stored, which raise and lower the rent respectively and are mutually 
// exclusive. Additionally, an object is stored in the Building data under the 
// key `energyValue`, which holds detailed info on the selected options, which
// includes the exact selected range, as well as any modifying options selected.

type EnergyInputProps = RangeInputProps & {
  directValue: {
    endenergiebedarf: boolean,
    decentralEnergy: boolean,
    historicSite: boolean,
    valueSelected: string
  }
};

const messages = defineMessages({
  Title: {
    id: "Building.EnergyTitle",
    defaultMessage: "Energieverbrauch"
  },
  Introduction: {
    id: "Building.EnergyIntroduction",
    defaultMessage: `In diesem Merkmal wird der Energieverbrauch des Gebäudes erfasst, 
    welcher sich aus dem Verbrauch für Heizung und Warmwasser zusammensetzt. Du findest
    den Energieverbrauch in deinen Heizkostenabrechnungen oder in einem Energieausweis.`
  },
  Endenergiebedarf: {
    id: "Building.Endenergiebedarf",
    defaultMessage: `Kennst du nur den Endenergiebedarf? Wenn du diese Option wählst, 
    erhöhen sich die Einordnungs-Grenzen um 20%`
  },
  EndenergiebedarfLabel: {
    id: "Building.EndenergiebedarfLabel",
    defaultMessage: "Ich kenne nur den Endenergiebedarf"
  },
  DecentralEnergy: {
    id: "Building.DecentralEnergy",
    defaultMessage: `Wird das Warmwasser dezentral, zum Beispiel über einen 
    Durchlauferhitzer, dort erwärmt, wo es gebraucht wird, statt an einer 
    zentralen Stelle in der Wohnung? In diesem Fall werden auf die 
    Verbrauchsgrenzen pauschal 20 kWh/(m²a) aufgeschlagen.`
  },
  DecentralEnergyLabel: {
    id: "Building.DecentralEnergyLabel",
    defaultMessage: "Dezentrale Warmwasserversorgung"
  },
  HistoricSite: {
    id: "Building.HistoricSite",
    defaultMessage: `Wenn deine Wohnung in einem denkmalgeschützten Gebäude 
    liegt, gilt hier eine Sonderregelung: Wird durch damit verbundene Auflagen
    nämlich eine energetische Sanierung verhindert, oder unverhältnismäßig teuer,
    dann wird der Energieverbrauch nicht mehr für die Einordnung berücksichtigt.`
  },
  HistoricSiteLabel: {
    id: "Building.HistoricSiteLabel",
    defaultMessage: `Denkmalschutz verhindert energetische Sanierung oder 
      erschwert diese finanziell erheblich.`
  },
  RadioIntro: {
    id: "Building.RadiobuttonGroupTitle",
    defaultMessage: "Der Energieverbrauch beträgt:"
  },
  Sub80: {
    id: "Building.EnergySub80",
    defaultMessage: "Unter {Sub80} kWh/(m²a)"
  },
  Sub100: {
    id: "Building.EnergySub100",
    defaultMessage: "Unter {Sub100} kWh/(m²a)"
  },
  Sub120: {
    id: "Building.EnergySub120",
    defaultMessage: "Unter {Sub120} kWh/(m²a)"
  },
  Super155: {
    id: "Building.EnergySuper155",
    defaultMessage: "Über {Super155} kWh/(m²a)"
  },
  Super195: {
    id: "Building.EnergySuper195",
    defaultMessage: "Über {Super195} kWh/(m²a)"
  },
  Super235: {
    id: "Building.EnergySuper235",
    defaultMessage: "Über {Super235} kWh/(m²a)"
  },
  unknown: {
    id: "Building.EnergyUnkown",
    defaultMessage: "Das weiß ich leider nicht."
  }
});

export default class EnergyClass extends React.Component {
  baseLimits = {
    "Sub80": 80,
    "Sub100": 100,
    "Sub120": 120,
    "Super155": 155,
    "Super195": 195,
    "Super235": 235
  }

  inputName : string = "Energy"

  constructor(props: EnergyInputProps) {
    super(props);
    autoBind(this);
  }

  getLimits() {
    // Calculate the current limits for energy consumption based on the selected
    // options.
    const customLimits = {};
    // eslint-disable-next-line array-callback-return
    Object.keys(this.baseLimits).map(k => {
      customLimits[k] = this.baseLimits[k] 
        * (this.props.directValue.energyValue !== undefined 
          && this.props.directValue.energyValue.endenergiebedarf ? 1.2 : 1)
        + (this.props.directValue.energyValue !== undefined 
          && this.props.directValue.energyValue.decentralEnergy ? 20 : 0)
    });
    return customLimits;
  }

  saveFeature(positive: boolean, cb: ?() => any) {
    // Represent energy consumption as two different features: 'EnergyGood' and
    // and 'EnergyBad'. This method selects and deselects them so that only one 
    // is active at a time.
    this.props.changed(this.inputName + "Good", true, positive === true, () => {
      this.props.changed(this.inputName + "Bad", false, positive === false, cb)
    });
  }

  clearFeature(cb: ?() => any) {
    this.props.changed(this.inputName + "Good", true, false, () => {
      this.props.changed(this.inputName + "Bad", false, false, () => {
        this.saveOption("value", "unknown", cb);
      });
    });
  }

  saveOption(optionName: string, value: any, cb: ?() => any) {
    // Save options by merging them into the data object for the Building
    // feature group under the 'energyValue' key
    const energyValue = this.props.directValue.energyValue !== undefined
      ? Object.assign({}, this.props.directValue.energyValue, {[optionName]: value})
      : {[optionName]: value};
    const BuildingGroup = Object.assign(
      {}, this.props.directValue, {energyValue});
    this.props.directChanged({BuildingGroup}, cb);
  }

  handleChange(ev: SyntheticInputEvent, value: string) {
    if (value === "unknown") {
      this.clearFeature();
    } else {
      const positive = value.slice(0, 3) === "Sub" ? true : false;
      this.saveFeature(positive, () => {
        this.saveOption("value", value);
      });
    }
  }

  handleOptionChange(option: string, value: boolean) {
    this.saveOption(option, value, () => {
      if (option === "historicSite" && value) this.clearFeature();
    });
  }

  render() {
    if (this.props.directValue === undefined) return <p>Nothing</p>;
    const energyValue = this.props.directValue.energyValue || {};

    const customLimits = this.getLimits();

    const options = Object.keys(this.baseLimits).concat("unknown");
    const radioOptions = options.map(k => 
      <RadioButton 
        value={k}
        key={k}
        disabled={energyValue.historicSite}
        label={this.props.intl.formatMessage(messages[k], customLimits)} 
      />);

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.Title)} />
      <CardText className="cardText">
        <p><FormattedMessage {...messages.Introduction} /></p>
      </CardText>

      <Divider />

      <CardText className="cardText">
        <h3>Sonderfälle</h3>
        <p><FormattedMessage {...messages.HistoricSite} /></p>
        <Checkbox 
          checked={energyValue.historicSite === true} 
          onCheck={(ev, value) => this.handleOptionChange("historicSite", value)}
          label={this.props.intl.formatMessage(messages.HistoricSiteLabel)} />
        <p><FormattedMessage {...messages.Endenergiebedarf} /></p>
        <Checkbox 
          checked={energyValue.endenergiebedarf === true} 
          onCheck={(ev, value) => this.handleOptionChange("endenergiebedarf", value)} 
          disabled={energyValue.historicSite === true}
          label={this.props.intl.formatMessage(messages.EndenergiebedarfLabel)} />
        <p><FormattedMessage {...messages.DecentralEnergy} /></p>
        <Checkbox 
          checked={energyValue.decentralEnergy === true} 
          onCheck={(ev, value) => this.handleOptionChange("decentralEnergy", value)} 
          disabled={energyValue.historicSite === true}
          label={this.props.intl.formatMessage(messages.DecentralEnergyLabel)} />
      </CardText>

      <Divider />

      <CardText className="cardText">
        <h3>Einordnung</h3>
        <p><FormattedMessage {...messages.RadioIntro} /></p>
        <RadioButtonGroup 
          onChange={this.handleChange} 
          name="energyValue" 
          valueSelected={energyValue.value} >
          {radioOptions}
        </RadioButtonGroup>
      </CardText>
    </Card>;
  }
};