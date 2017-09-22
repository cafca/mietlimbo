// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import {Introduction, Title} from './Introduction';
import Mietspiegel from './Presentation/Mietspiegel';
import FinalResult from './Presentation/FinalResult';
import Summary from './Presentation/Summary';
import Progress from './Progress';

import {
  stageNames,
  featureGroupNames,
  stageConditions,
  initialData
} from "./Config";

import {
  featureGroupLongTranslations,
  genericInputTranslations
} from "./GenericTranslations";

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
    data: {[string]: any},
    snackbarOpen: boolean,
    snackbarMsg: string
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
      data: initialData,
      snackbarMsg: "",
      snackbarOpen: false
    }
	}

  /**
   * Generate initial (empty) data set or load from localstorage, then update
   * page URL and end result.
   * 
   * @return {void}
   */
  componentWillMount() {
    this.setState(this.initializeData(), () => {
      if (this.props.match && this.props.match.params.stage && this.props.match.params.stage !== this.state.stage) {
        const stage = parseInt(this.props.match.params.stage, 10);
        stage !== undefined && this.requestStage(stage);
      } else this.update();
    });
  }

  /**
   * Process route passed in through URL if the requested stage is available
   * 
   * @param  {void} nextProps: AssistantProps 
   * @return {void}
   */
  componentWillReceiveProps(nextProps: AssistantProps) {
    if (nextProps.match && nextProps.match.params.stage !== this.props.match.params.stage) {
      const stage = parseInt(nextProps.match.params.stage, 10);
      stage !== undefined && this.requestStage(stage);
    }
  }

  /**
   * Load data from localstorage or generate empty data set
   * 
   * @return {Data}
   */
  initializeData() {
    const storedState = this.load();

    if (storedState) {
      return storedState
    } else {
      // Fill the dataset with empty objects in the beginning
      const data = Object.assign({}, this.state.data);
      // eslint-disable-next-line array-callback-return
      featureGroupNames.map(name => {
        if (data[name] === undefined) {
          data[name] = { positive: [], negative: [] };
        }
      });
      return { data };
    }
  }

  /**
   * Try navigating to the requested stage number
   * 
   * @param stage: number    Integer for the stage number to navigate to
   * @return {void}.         [description]
   */
  requestStage(stage: number) {
    if (stage !== undefined && stage !== this.state.stage && this.isStageEnabled(stage)) {
      this.setState({stage}, () => {
        // Callback to prevent race condition in this.componentWillReceiveProps
        this.props.history.push("/app/" + stage + "/");
        window.scrollTo(0, 0);
        this.update();
      });
    }
  }

  /**
   * Handler to be called when an input field becomes valid/invalid
   * 
   * @param  {[type]} name:  string        Name of the input field
   * @param  {[type]} valid: boolean       New validity state
   * @param  {[type]} cb?:   Function      Optional callback
   * @return {void}        [description]
   */
	handleInputValid(name: string, valid: boolean, cb?: Function) {
    const newInputValid = Object.assign(this.state.inputValid, {[name]: valid});
    this.setState({inputValid: newInputValid}, cb);
	}


  /**
   * Handler to be called when an input field's data has changed. Autosaves.
   * 
   * @param  {[type]} newData: Object        Object with all data fields to be 
   *                                         updated
   * @param  {[type]} cb?:     Function      Optional callback
   * @return {void}          [description]
   */
	handleInputChanged(newData: Object, cb?: Function) {
    // This method is called from input components when their respective data is updated
    this.setState({data: Object.assign({}, this.state.data, newData)}, () => {
      this.update(cb);
      this.state.data.autoSave && this.save();
    });
	}

  /**
   * Handler to be called when user clicks the next button on the bottom.
   *
   * Proceeds to the next stage if enabled or alerts the user of fields, which
   * still need to be filled out.
   * 
   * @return {[type]} [description]
   */
  handleNext() {
    if (this.isStageEnabled(this.state.stage + 1)) {
      this.requestStage(this.state.stage + 1)
    } else {
      const nextMissingName = this.missingFields()[0];
      const nextMissingElem = document.getElementById(nextMissingName);
      nextMissingElem && nextMissingElem.scrollIntoView();
      this.setState({
        snackbarOpen: true,
        snackbarMsg: this.props.intl.formatMessage({
          id: "Assistant.missingFieldMessage",
          defaultMessage: "Es fehlt noch eine Antwort zu {fieldname}"
        }, {
          fieldname: this.props.intl.formatMessage(
            {...genericInputTranslations[nextMissingName]})
        })
      })
    }
  }

  /**
   * Handler to be called when user closes alert (snackbar)
   * 
   * @return {[type]} [description]
   */
  handleSnackbarClose() {
    this.setState({snackbarOpen: false});
  }

  /**
   * Serialize data and data validity to HTML5 local storage
   * 
   * @return {void} [description]
   */
  save() {
    localStorage.setItem("data", JSON.stringify(this.state.data));
    localStorage.setItem("inputValid", JSON.stringify(this.state.inputValid));
  }

  /**
   * Deserialize data from HTML5 local storage. Fails on old browsers
   * 
   * @return {undefined} For old browsers
   * @return {{data: Data, inputValid, {[string]: boolean}}} Saved data
   */
  load() {
    let dataJSON = null, validJSON = null;

    try {
      dataJSON = localStorage.getItem("data");
      validJSON = localStorage.getItem("inputValid");
    } catch(e) {
      console.log("Browser does not support local storage.")
    }

    return (dataJSON && validJSON) ? {
        data: JSON.parse(dataJSON),
        inputValid: JSON.parse(validJSON)
      } : undefined;
  }

  /**
   * Update the final result if mietspiegel data is already available
   *
   * Makes available the keys 
   *         localRentLevel, 
   *         mietlimboLevel,
   *         mietlimbo,
   *         featureGroupBalance
   * under this.state.data.result
   * 
   * @param  {[type]} cb?: Function      Optional callback
   * @return {void}      [description]
   */
  update(cb?: Function) {
    if (this.state.inputValid["mietspiegel"]) {
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

  /**
   * Return true if all data required for proceeding to param stage is marked
   * valid in this.state.inputValid
   * 
   * @param  {[type]}  stage: number        Requested stage number
   * @return {Boolean}        True if enabled
   */
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

  /**
   * Returns a list of missing field names for completing this stage
   * 
   * @param  {[type]} stage?: number        Target stage, defaults to next stage
   * @return {[string]}         List of input names that are missing
   */
  missingFields(stage?: number) {
    if (stage === undefined) stage = this.state.stage + 1;
    return stageConditions
      .slice(0, stage)
      .reduce((acc, cur) => acc.concat(cur), [])
      .reduce((acc, cur) => 
        this.state.inputValid[cur] !== true
          ? acc.concat(cur) 
          : acc, 
        []
      );
  }

  /**
   * Render the assistant in current state. 
   *
   * Basically a big switch with a case for each stage. Feature group stages
   * are handled by the same switch as they are basically the same, just have
   * different inputs.
   * 
   * @return {[type]} [description]
   */
	render() {
		let content = "";
    let title = "";

		const valid = this.handleInputValid;
		const changed = this.handleInputChanged;

		switch(this.state.stage) {
			case 1:
        content = <div key="stage1">
          <LeaseCreatedInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.leaseCreated} />
          <NewBuildingInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.newBuilding} />
          <RenovationInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.renovation} />
          <PreviousRentInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.previousRent} />
        </div>;
				break;

			case 2:
        // BaseFeatures input component is only shown for certain construction dates
        // where the Mietspiegel mandates a correction of rent levels depending on the
        // absence or presence of these base features.
        let optionalInput = "";
        if (["Pre1918", "Pre1949", "Pre1964"].indexOf(this.state.data.constructionDate) >= 0) {
          stageConditions[2].push("baseFeatures");
          optionalInput = <BaseFeaturesInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.baseFeatures} />;
        }

				content = <div key="stage2">
          <AddressInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.address} />
          <SquareMetersInput 
            valid={valid} 
            changed={changed} 
            exact={this.state.data.squareMeters} 
            guessed={this.state.data.squareMetersGuessed} />
          <RentInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.rent} />
          <ConstructionDateInput 
            valid={valid} 
            changed={changed} 
            value={this.state.data.constructionDate} />
          {optionalInput}
				</div>;
				break;

      case 3:
        // Mietspiegelabfrage, ob genug Daten vorhanden sind
        content = <Mietspiegel 
          valid={valid}
          changed={changed}
          {...this.state.data} />;
        break;

      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        content = <div>
          <h1><FormattedMessage 
            {...featureGroupLongTranslations[stageNames[this.state.stage]]} />
          </h1>
          <RangeSelectionGroup 
            domain={stageNames[this.state.stage]}
            key={stageNames[this.state.stage]}
            inputComponents={featureGroupInputs[stageNames[this.state.stage]]}
            data={this.state.data[stageNames[this.state.stage]]}
            changed={changed} />
        </div>;
        break;

      case 9:
        content = <div key="stage11">
          <FinalResult 
            data={this.state.data} 
            changed={changed} />
        </div>;
        break;

      case 10:
        content = <div key="stage11">
          <Summary data={this.state.data} />
        </div>;
        break;

			case 0:
			default:
				content = <Introduction 
          autoSave={this.state.data.autoSave} 
          valid={valid}
          changed={changed} />;
        title = <Title />;
		}

    const debug = process.env.NODE_ENV === "production" ? null 
      : <span>
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
          <pre>{JSON.stringify(this.state.inputValid, null, 2)}</pre>
        </span>;

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
        onClick={this.handleNext} 
        label={this.isStageEnabled(this.state.stage + 1)
          ? <FormattedMessage
              id="Assistant.continue"
              defaultMessage="Weiter"
            />
          : <FormattedMessage
              id="Assistant.missingFields"
              defaultMessage="Alle Fragen beantwortet?"
            />} />
      <Snackbar
        open={this.state.snackbarOpen}
        message={this.state.snackbarMsg}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackbarClose} />
      {debug}
		</div>;
	}
}

export default injectIntl(Assistant);