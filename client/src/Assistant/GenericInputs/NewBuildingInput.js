// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import type {AssistantInputProps} from './Tools';

class NewBuildingInput extends React.Component {
	state: {
		value: ?boolean
	};

	inputName: string = "newBuilding";

	constructor(props: AssistantInputProps) {
		super(props);
		this.state = {value: props.value};
 		autoBind(this);
	}

  componentDidMount() {
    if(this.props.value !== undefined) this.props.valid(this.inputName, true);
  }

	handleChange(e: SyntheticInputEvent, value: boolean) {
		this.props.changed({[this.inputName]: value});
    this.props.valid(this.inputName, value === false);
		this.setState({value});
	}

	render() {
    const messages = defineMessages({
      title: {
        id: "Spanneneinordnung.newBuilding",
        defaultMessage: "Wohnst du in einem Neubau und bist Erstmieter?"
      },
      labelTrue: {
        id: "Spanneneinordnung.newBuildingTrue",
        defaultMessage: "Ja, das Haus wurde nach 1.10.2014 zuerst vermietet."
      },
      labelFalse: {
        id: "Spanneneinordnung.newBuildingFalse",
        defaultMessage: "Nein, das Haus ist entweder älter oder es gab schon vor mir Mieter."
      },
      warning: {
        id: "Spanneneinordnung.newBuildingWarning",
        defaultMessage: "Für Neubauten gilt die Mietpreisbremse leider nicht."
      }
    });

    const conditionalWarning = this.state.value === true ? <p style={{color: "red"}}>
      <FormattedMessage {...messages.warning} />
    </p> : <span></span>;

		return <Card className="assistantInput">
			<CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <RadioButtonGroup 
          name={this.inputName} 
          onChange={this.handleChange} 
          valueSelected={this.state.value} >
          <RadioButton
            value={true}
            label={this.props.intl.formatMessage(messages.labelTrue)} />

          <RadioButton
            value={false}
            label={this.props.intl.formatMessage(messages.labelFalse)} />
        </RadioButtonGroup>
        {conditionalWarning}
      </CardText>
		</Card>;
	}
}

export default injectIntl(NewBuildingInput);