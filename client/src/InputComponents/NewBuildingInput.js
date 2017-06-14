// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import type {AssistantInputProps} from './Tools';

class NewBuildingInput extends React.Component {
	state: {
		value: ?boolean
	};

	inputName: string = "newBuilding";

	constructor(props: AssistantInputProps) {
		super(props);
		this.state = {
			value: undefined,
		}
		autoBind(this);
	}

	handleChange(e: SyntheticInputEvent) {
		const value = e.target.value === "newBuildingTrue";
		this.props.changed({[this.inputName]: value});
    this.props.valid(this.inputName, true);
		this.setState({value});
	}

	render() {
    const messages = defineMessages({
      title: {
        id: "Spanneneinordnung.newBuilding",
        defaultMessage: "Wohnst du in einem Neubau und bist Erstmieter?"
      }
    });

		return <Card className="assistantInput">
			<CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
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
      </CardText>
		</Card>;
	}
}

export default injectIntl(NewBuildingInput);