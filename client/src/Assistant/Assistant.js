// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';

import {Introduction, Title} from './Introduction';
import Mietspiegel from './Presentation/Mietspiegel';
import FinalResult from './Presentation/FinalResult';
import Summary from './Presentation/Summary';
import Progress from './Progress';
import {
  stageNames,
  featureGroupNames,
  stageConditions,
  testData,
  initialData
} from "./Config";

import LeaseCreatedInput from './GenericInputs/LeaseCreatedInput';
import RenovationInput from './GenericInputs/RenovationInput';
import RentInput from './GenericInputs/RentInput';
import PreviousRentInput from './GenericInputs/PreviousRentInput';
import AddressInput from './GenericInputs/AddressInput';
import NewBuildingInput from './GenericInputs/NewBuildingInput';
import ConstructionDateInput from './GenericInputs/ConstructionDateInput';
import SquareMetersInput from './GenericInputs/SquareMetersInput';
import BaseFeaturesInput from './GenericInputs/BaseFeaturesInput';

import RangeSelectionGroup, { groupBalance } from './ApartmentFeatureInputs/RangeSelectionGroup';
import type GroupData from './ApartmentFeatureInputs/RangeSelectionGroup';
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
  "Auswertung": {
    id: "StageNames.Auswertung",
    defaultMessage: "Auswertung"
  },
  "Ausdrucken": {
    id: "StageNames.Ausdrucken",
    defaultMessage: "Ausdrucken"
  }
});

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

type AssistantProps = {
  match: {params: {stage: number}},
  location: {},
  intl: {}
};

export type Result = {
  min: number,
  mid: number,
  max: number,
  localRentLevel: number,
  mietlimboLevel: number,
  mietlimbo: number,
  featureGroupBalance: number
};

export type Data = {
  Bad: GroupData,
  Küche: GroupData,
  Wohnung: GroupData,
  Gebäude: GroupData,
  Umfeld: GroupData,
  leaseCreated: ?string,
  rent: ?number,
  address: ?Object,
  baseFeatures: ?string,
  constructionDate: ?string,
  newBuilding: ?boolean,
  squareMeters: ?number,
  renovation: ?string,
  previousRent: ?number,
  result: Result
};

const featureGroupInputs = {
  "Bad": BathFeatures,
  "Küche": KitchenFeatures,
  "Wohnung": ApartmentFeatures,
  "Gebäude": BuildingFeatures,
  "Umfeld": EnvironmentFeatures
};

class Assistant extends React.Component {
	state : {
		stage: number,
    inputValid: {[string]: boolean},
    data: {[string]: any}
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
    this.state = {
      stage: 0,
      inputValid: {},
      data: initialData
    }
	}

  componentWillMount() {
    // Fill state with empty data sets and activate stage based on URL
    this.setState(this.initializeData(), () => {
      if (this.props.match && this.props.match.params.stage) {
        const stage = parseInt(this.props.match.params.stage, 10);
        stage !== undefined && this.requestStage(stage);
      } else this.update();
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
    const data = Object.assign({}, this.state.data);
    // eslint-disable-next-line array-callback-return
    featureGroupNames.map(name => {
      if (data[name] === undefined) {
        data[name] = {
          positive: [],
          negative: []
        }
      }
    });
    // Form validity assumed on first mount
    const inputValid = {};
    // Linter wants arrow functions to always return a value
    // eslint-disable-next-line array-callback-return
    Object.keys(this.state.data).map(k => {
      inputValid[k] = true;
    });
    return { data, inputValid };
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

	handleInputValid(name: string, valid: boolean, cb?: Function) {
    const newInputValid = Object.assign(this.state.inputValid, {[name]: valid});
    this.setState({inputValid: newInputValid}, cb);
	}

	handleInputChanged(newData: Object, cb?: Function) {
    // This method is called from input components when their respective data is updated
    this.setState({data: Object.assign({}, this.state.data, newData)}, () => this.update(cb));
	}

  update(cb?: Function) {
    // Only update the Mietpreisbremse value when the final result page is accessible
    if (this.isStageEnabled(stageNames.indexOf("Auswertung"))) {
      // To calculate balance, for every group with predominantly positive features 1 is added,
      // for predominantly negative groups 1 is subtracted
      const featureGroupBalance = featureGroupNames
        .map(group => groupBalance(this.state.data[group]) < 0 
          ? -1 
          : groupBalance(this.state.data[group]) === 0 
            ? 0 
            : 1
        )
        .reduce((a, b) => (a + b), 0);

      // Select the range from which the correction amount will be drawn
      const maxCorrection = featureGroupBalance >= 0 
        ? (this.state.data.result.max - this.state.data.result.mid)
        : (this.state.data.result.mid - this.state.data.result.min);

      // Calculate the local rent level by applying the correction amount to 
      // the mid value of the Mietspiegel
      const localRentLevel = this.state.data.result.mid 
        + (parseFloat(featureGroupBalance) / featureGroupNames.length) * maxCorrection;

      featureGroupNames.length === 5

      // Rent may be 10% above local rent level
      const mietlimboLevel = localRentLevel * 1.1;

      // Calculate acceptable rent for the whole flat
      const mietlimbo = mietlimboLevel * this.state.data.squareMeters;

      const result = Object.assign({}, this.state.data.result, {
        localRentLevel, 
        mietlimboLevel,
        mietlimbo,
        featureGroupBalance
      });

      this.setState({data: Object.assign({}, this.state.data, {result})}, cb);
    } else {
      cb && cb();
    }
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
          <LeaseCreatedInput valid={valid} changed={changed} value={this.state.data.leaseCreated} />
          <NewBuildingInput valid={valid} changed={changed} value={this.state.data.newBuilding} />
          <RenovationInput valid={valid} changed={changed} value={this.state.data.renovation} />
          <PreviousRentInput valid={valid} changed={changed} value={this.state.data.previousRent} />
        </div>;
				break;

			case 2:
        // BaseFeatures input component is only shown for certain construction dates
        // where the Mietspiegel mandates a correction of rent levels depending on the
        // absence or presence of these base features.
        let optionalInput = "";
        if (["Pre1918", "Pre1949", "Pre1964"].indexOf(this.state.data.constructionDate) >= 0) {
          stageConditions[2].push("baseFeatures");
          optionalInput = <BaseFeaturesInput valid={valid} changed={changed} value={this.state.data.baseFeatures} />;
        }

				content = <div key="stage2">
          <AddressInput valid={valid} changed={changed} value={this.state.data.address} />
          <SquareMetersInput valid={valid} changed={changed} 
            exact={this.state.data.squareMeters} guessed={this.state.data.squareMetersGuessed} />
          <RentInput valid={valid} changed={changed} value={this.state.data.rent} />
          <ConstructionDateInput valid={valid} changed={changed} value={this.state.data.constructionDate} />
          {optionalInput}
				</div>;
				break;

      case 3:
        // Mietspiegelabfrage, ob genug Daten vorhanden sind
        content = <Mietspiegel 
          valid={valid}
          changed={changed}
          {...this.state.data}
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
            data={this.state.data[stageNames[this.state.stage]]}
            changed={changed} 
            />
        </div>;
        break;

      case 9:
        content = <div key="stage11">
          <FinalResult data={this.state.data} changed={changed} />
        </div>;
        break;

      case 10:
        content = <div key="stage11">
          <Summary data={this.state.data} />
        </div>;
        break;

			case 0:
			default:
				content = <Introduction />;
        title = <Title />;
		}

    const debug = process.env.NODE_ENV === "production" ? null 
      : <pre>{JSON.stringify(this.state.data, null, 2)}</pre>;

    // Don't display next button on final assistant page
    const buttonDisplayStyle = this.state.stage === stageNames.indexOf("Ausdrucken") 
      ? "none" : "initial";

		return <div className="assistant" style={this.style.container} >
      {title}
      <Progress 
        stage={this.state.stage} 
        isStageEnabled={this.isStageEnabled}
        requestStage={this.requestStage} 
        data={this.state.data} />
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