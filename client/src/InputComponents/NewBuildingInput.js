// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';

import {AssistantInputProps} from './Tools';

class NewBuildingInput extends React.Component {
	state: {
		value: boolean
	};

	inputName: string = "newBuilding";

	constructor(props: AssistantInputProps) {
		super(props);
		this.state = {
			value: false,
		}
		autoBind(this);
	}

	handleChange(e: SyntheticInputEvent) {
		const value = e.target.value === "newBuildingTrue";
		this.props.changed(this.inputName, value);
		this.setState({value});
	}

	componentDidMount() {
		this.props.valid(this.inputName, true);
	}

	render() {
		return <div className="assistantInput">
			<p><label htmlFor={this.inputName}>
				<FormattedMessage 
					id="Spanneneinordnung.newBuilding"
					defaultMessage="Wohnst du in einem Neubau und bist Erstmieter?" />
			</label></p>

			<div>
				<input
				id="newBuildingTrue"
				name={this.inputName}
				type="radio"
				value="newBuildingTrue"
				checked={this.state.value === true}
				onChange={this.handleChange} /> 
				<FormattedMessage
					id="Spanneneinordnung.newBuildingTrue" 
					defaultMessage="Ja, das Haus wurde nach 1.10.2014 zuerst vermietet." />
			</div>

			<div>
				<input
					id="newBuildingFalse"
					name={this.inputName}
					type="radio"
					value="newBuildingFalse"
					checked={this.state.value === false}
					onChange={this.handleChange} /> 
				<FormattedMessage
					id="Spanneneinordnung.newBuildingFalse"
					defaultMessage="Nein, das Haus ist entweder älter oder es gab schon vor mir Mieter." />
			</div>
		</div>;
	}
}

export default NewBuildingInput;