// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';

import Introduction from './Introduction';
import IntermediateResult from './IntermediateResult';
import FinalResult from './FinalResult';
import Progress from './Progress';

import LeaseCreatedInput from '../InputComponents/LeaseCreatedInput';
import RentInput from '../InputComponents/RentInput';
import AddressInput from '../InputComponents/AddressInput';
import NewBuildingInput from '../InputComponents/NewBuildingInput';
import ConstructionDateInput from '../InputComponents/ConstructionDateInput';
import SquareMetersInput from '../InputComponents/SquareMetersInput';
import BaseFeaturesInput from '../InputComponents/BaseFeaturesInput';
import SpecialFeaturesInput from '../InputComponents/SpecialFeaturesInput';

import RangeSelectionGroup from '../RangeInputComponents/RangeSelectionGroup';
import * as BathFeatures from '../RangeInputComponents/BathFeatures';
import * as KitchenFeatures from '../RangeInputComponents/KitchenFeatures';
import * as ApartmentFeatures from '../RangeInputComponents/ApartmentFeatures';
import * as BuildingFeatures from '../RangeInputComponents/BuildingFeatures';
import * as EnergyFeatures from '../RangeInputComponents/EnergyFeatures';
import * as EnvironmentFeatures from '../RangeInputComponents/EnvironmentFeatures';

import './Assistant.css';

class Assistant extends React.Component {
	state = {
		stage: 2,
		serialNumber: "03",
    inputValid: {},
    inputData: {
      "leaseCreated": "2017-06-30T22:00:00.000Z",
      "rent": 1200,
      "address": {
        "id": 38536,
        "streetname": "Wittstocker Straße (Mitte)",
        "range": "alle Hausnummern von 2 bis 26"
      },
      "newBuilding": false,
      "constructionDate": null,
      "constructionDateGuessed": "Pre1949",
      "squareMeters": 128,
      "squareMetersGuessed": null,
      "baseFeatures": "default",
      "intermediateResult": {
        "max": 7.51,
        "mid": 5.8,
        "min": 4.29
      },
      "BathGroup": {
        "positive": [],
        "negative": [
          "FixedBathtub",
          "InsufficientTiling",
          "NoWindows"
        ],
        "balance": -3
      },
      "KitchenGroup": {
        "positive": [],
        "negative": [],
        "balance": 0
      },
      "ApartmentGroup": {
        "positive": [
          "BidirectionalBroadband",
          "StorageCabinet"
        ],
        "negative": [
          "NoBalcony",
          "WindowStyleSingle"
        ],
        "balance": 0
      },
      "BuildingGroup": {
        "positive": [],
        "negative": [
          "NoStorageRoom"
        ],
        "balance": -1
      },
      "EnergyGroup": {
        "positive": [],
        "negative": [],
        "balance": 0
      },
      "EnvironmentGroup": {
        "positive": [
          "NeatoTrash"
        ],
        "negative": [
          "CommercialNoise"
        ],
        "balance": 0
      }
    }
	}

  stageNames = [
    "Start",
    "Eckdaten",
    "Mietspiegelabfrage",
    "Sondermerkmale",
    "Bad",
    "Küche",
    "Wohnung",
    "Gebäude",
    "Energie",
    "Umfeld",
    "Ergebnis"
  ];

  style = {
    container: {
      paddingLeft: 180
    }
  }

	constructor(props: {}) {
		super(props);
		autoBind(this);
	}

  componentWillMount() {
    // Fill state with empty data sets
    const inputData = Object.assign({}, this.state.inputData);
    const rangeData = ["KitchenGroup", "ApartmentGroup", "BuildingGroup", "EnergyGroup", "EnvironmentGroup"].map(name => {
      if (inputData[name] === undefined) {
        inputData[name] = {
          positive: [],
          negative: [],
          balance: 0
        }
      }
    });
    // Form validity assumed on first mount
    const inputValid = {};
    Object.keys(this.state.inputData).map(k => {
      inputValid[k] = true;
    });
    this.setState({inputData, inputValid});
  }

  advanceStage(steps: number) {
    const stage = (this.state.stage + steps) % (this.stageNames.length + 1)
    this.setState({stage});
    window.scrollTo(0, 0);
  }

	handleInputValid(name: string, valid: boolean) {
    const newInputValid = Object.assign(this.state.inputValid, {[name]: valid});
    this.setState({inputValid: newInputValid});
	}

	handleInputChanged(newData: Object) {
    // This method is called from input components when their internal data is updated
    this.setState({inputData: Object.assign({}, this.state.inputData, newData)});
    Object.keys(newData).map(k => console.log(k, newData[k]));
	}

  stageValid(fieldNames: Array<string>) {
    return fieldNames.map(k => this.state.inputValid[k] === true).every(v => v === true);
  }

	render() {
		let content;
    let conditions: Array<string> = [];

		const valid = this.handleInputValid;
		const changed = this.handleInputChanged;

    const data = JSON.stringify(this.state.inputData, null, 2);

		switch(this.state.stage) {
			case 1:
        content = <div key="stage1">
          <LeaseCreatedInput valid={valid} changed={changed} value={this.state.inputData.leaseCreated} />
          <RentInput valid={valid} changed={changed} value={this.state.inputData.rent} />
          <AddressInput valid={valid} changed={changed} value={this.state.inputData.address} />
        </div>;
        conditions = ["leaseCreated", "rent", "address"];
				break;

			case 2:
				content = <div key="stage2">
					<NewBuildingInput valid={valid} changed={changed} value={this.state.inputData.newBuilding} />
					<ConstructionDateInput valid={valid} changed={changed} 
            exact={this.state.inputData.constructionDate} guessed={this.state.inputData.constructionDateGuessed}/>
					<SquareMetersInput valid={valid} changed={changed} 
            exact={this.state.inputData.squareMeters} guessed={this.state.inputData.squareMetersGuessed} />
          <BaseFeaturesInput valid={valid} changed={changed} value={this.state.inputData.baseFeatures} />
				</div>;
        conditions = ["newBuilding", "constructionDate", "squareMeters", "baseFeatures"];
				break;

      case 3:
        // Mietspiegelabfrage, ob genug Daten vorhanden sind
        content = <IntermediateResult 
          valid={valid}
          changed={changed}
          {...this.state.inputData}
        />;
        conditions = ["intermediateResult"];
        break;

      case 4:
        // Let component add to validity conditions of current stage
        conditions = ["specialFeatures"];
        content = <SpecialFeaturesInput 
          constructionDate={this.state.inputData.constructionDate} 
          constructionDateGuessed={this.state.inputData.constructionDateGuessed} 
          valid={valid} 
          changed={changed} />;
          this.advanceStage(1);
        break;

      case 5:
        content = <div>
          <h1>
            <FormattedMessage
              id="Bath.Header"
              defaultMessage="Badezimmer und WC" />
          </h1>
          <RangeSelectionGroup 
            domain="BathGroup"
            key="BathGroup"
            inputComponents={BathFeatures}
            inputData={this.state.inputData.BathGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 6:
        content = <div key="stage6">
          <h1>
            <FormattedMessage
              id="Kitchen.Header"
              defaultMessage="Küche" />
          </h1>
          <RangeSelectionGroup 
            domain="KitchenGroup"
            key="KitchenGroup"
            inputComponents={KitchenFeatures}
            inputData={this.state.inputData.KitchenGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 7:
        content = <div key="stage7">
          <h1>
            <FormattedMessage
              id="Apartment.Header"
              defaultMessage="Wohnung" />
          </h1>
          <RangeSelectionGroup 
            domain="ApartmentGroup"
            key="ApartmentGroup"
            inputComponents={ApartmentFeatures}
            inputData={this.state.inputData.ApartmentGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 8:
        content = <div key="stage8">
          <h1>
            <FormattedMessage
              id="Building.Header"
              defaultMessage="Gebäude" />
          </h1>
          <RangeSelectionGroup 
            domain="BuildingGroup"
            key="BuildingGroup"
            inputComponents={BuildingFeatures}
            inputData={this.state.inputData.BuildingGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 9:
        content = <div key="stage9">
          <h1>
            <FormattedMessage
              id="Energy.Header"
              defaultMessage="Energie" />
          </h1>
          <RangeSelectionGroup 
            domain="EnergyGroup"
            key="EnergyGroup"
            inputComponents={EnergyFeatures}
            inputData={this.state.inputData.EnergyGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 10:
        content = <div key="stage10">
          <h1>
            <FormattedMessage
              id="Environment.Header"
              defaultMessage="Wohnumfeld" />
          </h1>
          <RangeSelectionGroup 
            domain="EnvironmentGroup"
            key="EnvironmentGroup"
            inputComponents={EnvironmentFeatures}
            inputData={this.state.inputData.EnvironmentGroup}
            changed={changed} 
            />
        </div>;
        break;

      case 11:
        content = <div key="stage11">
          <FinalResult data={this.state.inputData} />
        </div>;
        break;

			case 0:
			default:
				content = <Introduction serialNumber={this.state.serialNumber} />;
		}

		return <div className="assistant" style={this.style.container} >
      <Progress 
        serialNumber={this.state.serialNumber} 
        stage={this.state.stage} 
        stageNames={this.stageNames}
        advance={this.advanceStage} />
      {content}
      <RaisedButton 
        primary={true} 
        style={{display: (this.state.stage == this.stageNames.length ? "none" : "initial")}}
        onClick={() => this.advanceStage(1)} 
        disabled={!this.stageValid(conditions)}
        label={this.props.intl.formatMessage({
          id: "Assistant.continue",
          defaultMessage: "Weiter"
        })} />
      <div><pre>{data}</pre></div>
		</div>;
	}
}

export default injectIntl(Assistant);