// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';

import {Introduction, Title} from './Introduction';
import IntermediateResult from './Presentation/IntermediateResult';
import FinalResult from './Presentation/FinalResult';
import Progress from './Progress';

import LeaseCreatedInput from './GenericInputs/LeaseCreatedInput';
import RenovationInput from './GenericInputs/RenovationInput';
import RentInput from './GenericInputs/RentInput';
import PreviousRentInput from './GenericInputs/PreviousRentInput';
import AddressInput from './GenericInputs/AddressInput';
import NewBuildingInput from './GenericInputs/NewBuildingInput';
import ConstructionDateInput from './GenericInputs/ConstructionDateInput';
import SquareMetersInput from './GenericInputs/SquareMetersInput';
import BaseFeaturesInput from './GenericInputs/BaseFeaturesInput';

import RangeSelectionGroup from './ApartmentFeatureInputs/RangeSelectionGroup';
import * as BathFeatures from './ApartmentFeatureInputs/BathFeatures';
import * as KitchenFeatures from './ApartmentFeatureInputs/KitchenFeatures';
import * as ApartmentFeatures from './ApartmentFeatureInputs/ApartmentFeatures';
import * as BuildingFeatures from './ApartmentFeatureInputs/BuildingFeatures';
import * as EnvironmentFeatures from './ApartmentFeatureInputs/EnvironmentFeatures';

import './Assistant.css';

export const stageNameTranslations = defineMessages({
  "Einleitung": {
    id: "StageNames.Einleitung",
    defaultMessage: "Einleitung"
  },
  "Ausnahmen": {
    id: "StageNames.Ausnahmen",
    defaultMessage: "Ausnahmen"
  },
  "Basisdaten": {
    id: "StageNames.Basisdaten",
    defaultMessage: "Basisdaten"
  },
  "Mietspiegel": {
    id: "StageNames.Mietspiegel",
    defaultMessage: "Mietspiegel"
  },
  "Bad": {
    id: "StageNames.Bad",
    defaultMessage: "Bad"
  },
  "Küche": {
    id: "StageNames.Küche",
    defaultMessage: "Küche"
  },
  "Wohnung": {
    id: "StageNames.Wohnung",
    defaultMessage: "Wohnung"
  },
  "Gebäude": {
    id: "StageNames.Gebäude",
    defaultMessage: "Gebäude"
  },
  "Umfeld": {
    id: "StageNames.Umfeld",
    defaultMessage: "Umfeld"
  },
  "mietlimbo!": {
    id: "StageNames.mietlimbo",
    defaultMessage: "mietlimbo!"
  },
  "Ausdrucken": {
    id: "StageNames.Ausdrucken",
    defaultMessage: "Ausdrucken"
  }
});

export const stageNames = [
  "Einleitung",
  "Ausnahmen",
  "Basisdaten",
  "Mietspiegel",
  "Bad",
  "Küche",
  "Wohnung",
  "Gebäude",
  "Umfeld",
  "mietlimbo!",
  "Ausdrucken"
];

// Stages with feature groups
export const featureGroupNames = Object.keys(stageNameTranslations).slice(4, 9);

const featureGroupLongNames = defineMessages({
  "Bad": {
    id: "StageHeaders.Bad",
    defaultMessage: "Badezimmer und WC"
  },
  "Küche": {
    id: "StageHeaders.Küche",
    defaultMessage: "Küche"
  },
  "Wohnung": {
    id: "StageHeaders.Wohnung",
    defaultMessage: "Wohnung"
  },
  "Gebäude": {
    id: "StageHeaders.Gebäude",
    defaultMessage: "Gebäude"
  },
  "Umfeld": {
    id: "StageHeaders.Umfeld",
    defaultMessage: "Wohnumfeld"
  },
});

const featureGroupInputs = {
  "Bad": BathFeatures,
  "Küche": KitchenFeatures,
  "Wohnung": ApartmentFeatures,
  "Gebäude": BuildingFeatures,
  "Umfeld": EnvironmentFeatures
};

// These fields are required in order to advance to the next assistant stage
// (all previous conditions are also required, of course)
export const stageConditions = [
  [],
  ["leaseCreated", "newBuilding", "renovation", "baseFeatures"],
  ["address", "squareMeters", "rent", "previousRent", "constructionDate"],
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

const testData = {
  "Bad":{"positive":[],"negative":[]},
  "Küche":{"positive":[],"negative":[]},
  "Wohnung":{"positive":[],"negative":[]},
  "Gebäude":{"positive":[],"negative":[]},
  "Umfeld":{"positive":[],"negative":[]},
  "leaseCreated":"2015-07-31T22:00:00.000Z",
  "rent":1200,
  "address":{"id":16086,"streetname":"Hochkalterweg (Tempelhof-Schöneberg)","range":"alle Hausnummern"},
  baseFeatures: "default",
  constructionDate: "Pre2002",
  intermediateResult: {max: 9.27, mid: 8, min: 6.3},
  newBuilding: false,
  squareMeters: 90,
  renovation: "simple",
  previousRent: -1
};

class Assistant extends React.Component {
	state = {
		stage: 0,
    inputValid: {},
    inputData: process.env.NODE_ENV === "production" ? {} : testData
	}

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
    // Fill state with empty data sets and activate stage based on URL
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
    featureGroupNames.map(name => {
      if (inputData[name] === undefined) {
        inputData[name] = {
          positive: [],
          negative: []
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
    // This method is called from input components when their respective data is updated
    this.setState({inputData: Object.assign({}, this.state.inputData, newData)}, cb);
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
    let title = "";

		const valid = this.handleInputValid;
		const changed = this.handleInputChanged;

		switch(this.state.stage) {
			case 1:
        content = <div key="stage1">
          <LeaseCreatedInput valid={valid} changed={changed} value={this.state.inputData.leaseCreated} />
          <NewBuildingInput valid={valid} changed={changed} value={this.state.inputData.newBuilding} />
          <RenovationInput valid={valid} changed={changed} value={this.state.inputData.renovation} />
          <BaseFeaturesInput valid={valid} changed={changed} value={this.state.inputData.baseFeatures} />
        </div>;
				break;

			case 2:
				content = <div key="stage2">
          <AddressInput valid={valid} changed={changed} value={this.state.inputData.address} />
          <ConstructionDateInput valid={valid} changed={changed} value={this.state.inputData.constructionDate} />
          <SquareMetersInput valid={valid} changed={changed} 
            exact={this.state.inputData.squareMeters} guessed={this.state.inputData.squareMetersGuessed} />
          <RentInput valid={valid} changed={changed} value={this.state.inputData.rent} />
          <PreviousRentInput valid={valid} changed={changed} value={this.state.inputData.previousRent} />
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
      case 5:
      case 6:
      case 7:
      case 8:
        content = <div>
          <h1><FormattedMessage {...featureGroupLongNames[stageNames[this.state.stage]]} /></h1>
          <RangeSelectionGroup 
            domain={stageNames[this.state.stage]}
            key={stageNames[this.state.stage]}
            inputComponents={featureGroupInputs[stageNames[this.state.stage]]}
            inputData={this.state.inputData[stageNames[this.state.stage]]}
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
				content = <Introduction />;
        title = <Title />;
		}

    const debug = process.env.NODE_ENV === "production" ? null 
      : <pre>{JSON.stringify(this.state.inputData, null, 2)}</pre>;

    // Don't display next button on final assistant page
    const buttonDisplayStyle = this.state.stage === stageNames.indexOf("mietlimbo!") 
      ? "none" : "initial";

		return <div className="assistant" style={this.style.container} >
      {title}
      <Progress 
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