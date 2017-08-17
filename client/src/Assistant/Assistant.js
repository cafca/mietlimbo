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
import RenovationInput from '../InputComponents/RenovationInput';
import RentInput from '../InputComponents/RentInput';
import PreviousRentInput from '../InputComponents/PreviousRentInput';
import AddressInput from '../InputComponents/AddressInput';
import NewBuildingInput from '../InputComponents/NewBuildingInput';
import ConstructionDateInput from '../InputComponents/ConstructionDateInput';
import SquareMetersInput from '../InputComponents/SquareMetersInput';
import BaseFeaturesInput from '../InputComponents/BaseFeaturesInput';

import RangeSelectionGroup from '../RangeInputComponents/RangeSelectionGroup';
import * as BathFeatures from '../RangeInputComponents/BathFeatures';
import * as KitchenFeatures from '../RangeInputComponents/KitchenFeatures';
import * as ApartmentFeatures from '../RangeInputComponents/ApartmentFeatures';
import * as BuildingFeatures from '../RangeInputComponents/BuildingFeatures';
import * as EnvironmentFeatures from '../RangeInputComponents/EnvironmentFeatures';

import './Assistant.css';

export const stageNames = [
  "Start",
  "Eckdaten",
  "Mietspiegelabfrage",
  "Bad",
  "Küche",
  "Wohnung",
  "Gebäude",
  "Umfeld",
  "Ergebnis"
];

// These fields are required in order to advance to the next assistant stage
// (all previous conditions are also required, of course)
export const stageConditions = [
  [],
  ["leaseCreated", "rent", "previousRent", "address"],
  ["newBuilding", "constructionDate", "squareMeters", "baseFeatures"],
  ["intermediateResult"],
  [],
  [],
  [],
  [],
  []
];

type AssistantProps = {
  match: {params: {stage: number}},
  location: {},
  intl: {}
};

class Assistant extends React.Component {
	state = {
		stage: 0,
		serialNumber: "03",
    inputValid: {},
    inputData: {
      "BathGroup":{"positive":[],"negative":[],"balance":0},
      "KitchenGroup":{"positive":[],"negative":[],"balance":0},
      "ApartmentGroup":{"positive":[],"negative":[],"balance":0},
      "BuildingGroup":{"positive":[],"negative":[],"balance":0},
      "EnvironmentGroup":{"positive":[],"negative":[],"balance":0},
      "leaseCreated":"2015-07-31T22:00:00.000Z",
      "rent":900,
      "address":{"id":16086,"streetname":"Hochkalterweg (Tempelhof-Schöneberg)","range":"alle Hausnummern"},
      baseFeatures: "default",
      constructionDate: "Pre2002",
      intermediateResult: {max: 9.27, mid: 8, min: 6.3},
      newBuilding: false,
      squareMeters: 90,
      renovation: "simple",
      previousRent: -1
    }
	}
  // inputData: {"BathGroup":{"positive":[],"negative":[],"balance":0},"KitchenGroup":{"positive":[],"negative":[],"balance":0},"ApartmentGroup":{"positive":[],"negative":[],"balance":0},"BuildingGroup":{"positive":[],"negative":[],"balance":0},"EnvironmentGroup":{"positive":[],"negative":[],"balance":0},"leaseCreated":"2015-07-31T22:00:00.000Z","rent":900,"address":{"id":16086,"streetname":"Hochkalterweg (Tempelhof-Schöneberg)","range":"alle Hausnummern"}}}

  style = {
    container: {
      paddingLeft: 180,
      marginBottom: 100
    }
  };

	constructor(props: AssistantProps) {
		super(props);
		autoBind(this);
	}

  componentWillMount() {
    // Fill state with empty data sets
    this.setState(this.initializeData(), () => {
      if (this.props.match && this.props.match.params.stage) {
        const stage = parseInt(this.props.match.params.stage, 10);
        stage !== undefined && this.requestStage(stage);
      }
    });
  }

  componentWillReceiveProps(nextProps: AssistantProps) {
    // Process route passed in through URL if the requested stage is available
    if (nextProps.match && nextProps.match.params.stage !== this.props.match.params.stage) {
      const stage = parseInt(nextProps.match.params.stage, 10);
      stage !== undefined && this.requestStage(stage);
    }
  }

  initializeData() {
    // Fill the dataset with emoty objects in the beginning
    const inputData = Object.assign({}, this.state.inputData);
    // eslint-disable-next-line array-callback-return
    ["BathGroup", "KitchenGroup", "ApartmentGroup", "BuildingGroup", "EnvironmentGroup"].map(name => {
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
    // Linter wants arrow functions to always return a value
    // eslint-disable-next-line array-callback-return
    Object.keys(this.state.inputData).map(k => {
      inputValid[k] = true;
    });
    return { inputData, inputValid };
  }

  requestStage(stage: number) {
    if (stage !== undefined && stage !== this.state.stage && this.isStageEnabled(stage)) {
      this.setState({stage}, () => {
        // Callback to prevent race condition in this.componentWillReceiveProps
        this.props.history.push("/app/" + stage + "/");
        window.scrollTo(0, 0);
      });
    }
  }

	handleInputValid(name: string, valid: boolean) {
    const newInputValid = Object.assign(this.state.inputValid, {[name]: valid});
    this.setState({inputValid: newInputValid});
	}

	handleInputChanged(newData: Object, cb: () => any) {
    // This method is called from input components when their internal data is updated
    this.setState({inputData: Object.assign({}, this.state.inputData, newData)}, cb);
    Object.keys(newData).map(k => console.log(k, newData[k]));
	}

  isStageEnabled(stage: number) {
    if (stage > stageNames.length) {
      return false;
    } else {
      // A stage is enabled if the conditions for all stages up to
      // it are keys of the inputValid object
      return stageConditions
        .slice(0, stage)
        .reduce((acc, cur) => acc.concat(cur), [])
        .map(condition => this.state.inputValid[condition] === true)
        .every(v => v === true);
    }
  }

	render() {
		let content = "";

		const valid = this.handleInputValid;
		const changed = this.handleInputChanged;

		switch(this.state.stage) {
			case 1:
        content = <div key="stage1">
          <LeaseCreatedInput valid={valid} changed={changed} value={this.state.inputData.leaseCreated} />
          <RenovationInput valid={valid} changed={changed} value={this.state.inputData.renovation} />
          <RentInput valid={valid} changed={changed} value={this.state.inputData.rent} />
          <PreviousRentInput valid={valid} changed={changed} value={this.state.inputData.previousRent} />
          <AddressInput valid={valid} changed={changed} value={this.state.inputData.address} />
        </div>;
				break;

			case 2:
				content = <div key="stage2">
					<NewBuildingInput valid={valid} changed={changed} value={this.state.inputData.newBuilding} />
					<ConstructionDateInput valid={valid} changed={changed} value={this.state.inputData.constructionDate} />
					<SquareMetersInput valid={valid} changed={changed} 
            exact={this.state.inputData.squareMeters} guessed={this.state.inputData.squareMetersGuessed} />
          <BaseFeaturesInput valid={valid} changed={changed} value={this.state.inputData.baseFeatures} />
				</div>;
				break;

      case 3:
        // Mietspiegelabfrage, ob genug Daten vorhanden sind
        content = <IntermediateResult 
          valid={valid}
          changed={changed}
          {...this.state.inputData}
        />;
        break;

      case 4:
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

      case 5:
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

      case 6:
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

      case 7:
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

      case 8:
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

      case 9:
        content = <div key="stage11">
          <FinalResult data={this.state.inputData} changed={changed} />
        </div>;
        break;

			case 0:
			default:
				content = <Introduction serialNumber={this.state.serialNumber} />;
		}
    const debug = process.env.NODE_ENV === "production" ? null : <pre>{JSON.stringify(this.state.inputData, null, 2)}</pre>;

    const buttonDisplayStyle = this.state.stage === stageNames.length ? "none" : "initial";
		return <div className="assistant" style={this.style.container} >
      <Progress 
        serialNumber={this.state.serialNumber} 
        stage={this.state.stage} 
        isStageEnabled={this.isStageEnabled}
        requestStage={this.requestStage} 
        data={this.state.inputData} />
      {content}
      <RaisedButton 
        primary={true} 
        style={{display: buttonDisplayStyle}}
        onClick={() => this.requestStage(this.state.stage + 1)} 
        disabled={!this.isStageEnabled(this.state.stage + 1)}
        label={this.props.intl.formatMessage({
          id: "Assistant.continue",
          defaultMessage: "Weiter"
        })} />
      {debug}
		</div>;
	}
}

export default injectIntl(Assistant);