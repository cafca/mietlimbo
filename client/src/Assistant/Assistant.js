// @flow

import React from 'react';
import autoBind from 'react-autobind';

import LeaseCreatedInput from '../InputComponents/LeaseCreatedInput';
import RentInput from '../InputComponents/RentInput';
import AddressInput from '../InputComponents/AddressInput';

import NewBuildingInput from '../InputComponents/NewBuildingInput';
import ConstructionDateInput from '../InputComponents/ConstructionDateInput';
import SquareMetersInput from '../InputComponents/SquareMetersInput';
import BaseFeaturesInput from '../InputComponents/BaseFeaturesInput';

import Introduction from './Introduction';
import { FormattedMessage, FormattedDate } from 'react-intl';


import './Assistant.css';

const Header = (props) => {
  const style = {
    main: {
      marginBottom: "2em"
    },
    items: {
      marginRight: 5
    }
  }
  return <section style={style.main}>
    <span style={style.items}>#{props.serialNumber}</span>
    <span style={style.items}><FormattedDate value={new Date()} /></span>
  </section>;
}

class Assistant extends React.Component {
	state = {
		stage: 1,
		serialNumber: "03",
		formValid: true
	}

	constructor(props: {}) {
		super(props);
		autoBind(this);
	}

	handleContinue(e: Event) {
		this.setState({stage: (this.state.stage + 1)});
	}

	handleFormValid(formValid: boolean) {
		if (this.state.formValid !== formValid) this.setState({formValid});
	}

	handleSave(data: Object) {
		console.log("Saved", data);
	}

	handleInputValid(name: string, valid: boolean) {
		console.log(name, "valid", valid);
	}

	handleInputChanged(name: string, data: Object) {
		console.log(name, data);
	}

	render() {
		let content;

		const valid = this.handleInputValid;
		const changed = this.handleInputChanged;

		switch(this.state.stage) {
			case 1:
        content = <div>
          <LeaseCreatedInput valid={valid} changed={changed} />
          <RentInput valid={valid} changed={changed} />
          <AddressInput valid={valid} changed={changed} />
        </div>;
				break;

			case 2:
				content = <div>
					<NewBuildingInput valid={valid} changed={changed} />
					<ConstructionDateInput valid={valid} changed={changed} />
					<SquareMetersInput valid={valid} changed={changed} />
          <BaseFeaturesInput valid={valid} changed={changed} />
				</div>;
				break;

			case 0:
			default:
				content = <Introduction serialNumber={this.state.serialNumber} />;
		}

		return <div className="assistant">
          <Header serialNumber={this.state.serialNumber} stage={this.state.stage} />
          {content}
          <button onClick={this.handleContinue} disabled={!this.state.formValid}>
          	<FormattedMessage
          		id="Assistant.continue"
          		defaultMessage="Continue"
          	/>
          </button>
		</div>;
	}
}

export default Assistant;