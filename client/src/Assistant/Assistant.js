// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';

import Introduction from './Introduction';
import IntermediateResult from './IntermediateResult';
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
      "leaseCreated": "2006-05-12",
      "rent": 1000,
      "address": "Wittelsbacherstraße 5, 10707 Berlin, Deutschland",
      "addressPlace": "ChIJ2waGHO5QqEcR_LHKINnI5z0",
      "newBuilding": false,
      "constructionDate": null,
      "constructionDateGuessed": "Pre1990",
      "squareMeters": null,
      "squareMetersGuessed": "lt90",
      "baseFeatures": "default",
      "intermediateResult": {
        "sufficientData": true,
        "rentLevel": 5.43,
        "lowerBound": 4.13,
        "upperBound": 7.42
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
    "Umfeld"
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

  advanceStage(steps: number) {
    const newStage = (this.state.stage + steps) % this.stageNames.length
    this.setState({stage: (this.state.stage + steps)});
  }

	handleContinue(e: Event) {
		this.setState({stage: (this.state.stage + 1)});
	}

	handleInputValid(name: string, valid: boolean) {
    const newInputValid = Object.assign(this.state.inputValid, {[name]: valid});
    this.setState({inputValid: newInputValid});
	}

	handleInputChanged(newData: Object) {
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
        content = <div>
          <LeaseCreatedInput valid={valid} changed={changed} />
          <RentInput valid={valid} changed={changed} />
          <AddressInput valid={valid} changed={changed} />
        </div>;
        conditions = ["leaseCreated", "rent", "address"];
				break;

			case 2:
				content = <div>
					<NewBuildingInput valid={valid} changed={changed} />
					<ConstructionDateInput valid={valid} changed={changed} />
					<SquareMetersInput valid={valid} changed={changed} />
          <BaseFeaturesInput valid={valid} changed={changed} />
				</div>;
        conditions = ["newBuilding", "constructionDate", "squareMeters", "baseFeatures"];
				break;

      case 3:
        // Mietspiegelabfrage, ob genug Daten vorhanden sind
        conditions = ["intermediateResult"];
        content = <IntermediateResult 
          valid={valid}
          changed={changed}
          {...this.state.inputData}
        />;
        break;

      case 4:
        // Let component add to validity conditions of current stage
        conditions = ["specialFeatures"];
        content = <SpecialFeaturesInput 
          constructionDate={this.state.inputData.constructionDate} 
          constructionDateGuessed={this.state.inputData.constructionDateGuessed} 
          valid={valid} 
          changed={changed} />;
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
            inputComponents={BathFeatures}
            changed={changed} 
            />
        </div>;
        break;

      case 6:
        content = <div>
          <h1>
            <FormattedMessage
              id="Kitchen.Header"
              defaultMessage="Küche" />
          </h1>
          <RangeSelectionGroup 
            domain="KitchenGroup"
            inputComponents={KitchenFeatures}
            changed={changed} 
            />
        </div>;
        break;

      case 7:
        content = <div>
          <h1>
            <FormattedMessage
              id="Apartment.Header"
              defaultMessage="Wohnung" />
          </h1>
          <RangeSelectionGroup 
            domain="ApartmentGroup"
            inputComponents={ApartmentFeatures}
            changed={changed} 
            />
        </div>;
        break;

      case 8:
        content = <div>
          <h1>
            <FormattedMessage
              id="Building.Header"
              defaultMessage="Gebäude" />
          </h1>
          <RangeSelectionGroup 
            domain="BuildingGroup"
            inputComponents={BuildingFeatures}
            changed={changed} 
            />
        </div>;
        break;

      case 9:
        content = <div>
          <h1>
            <FormattedMessage
              id="Energy.Header"
              defaultMessage="Energie" />
          </h1>
          <RangeSelectionGroup 
            domain="EnergyGroup"
            inputComponents={EnergyFeatures}
            changed={changed} 
            />
        </div>;
        break;

      case 10:
        content = <div>
          <h1>
            <FormattedMessage
              id="Environment.Header"
              defaultMessage="Wohnumfeld" />
          </h1>
          <RangeSelectionGroup 
            domain="EnvironmentGroup"
            inputComponents={EnvironmentFeatures}
            changed={changed} 
            />
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