// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import type {AssistantInputProps} from './Tools';

export const radioOptions = [
  "Pre1918",
  "Pre1949", 
  "Pre1964", 
  "Pre1972", 
  "Pre1990", 
  "Pre2002", 
  "Pre2015"
];

export const radioDescriptions = defineMessages({
  Pre1918: {
    id: "Spanneneinordnung.constructionDateGuessedPre1918",
    defaultMessage: "bezugsfertig bis 1918 (Altbau)"
  },
  Pre1949: {
    id: "Spanneneinordnung.constructionDateGuessedPre1949",
    defaultMessage: "1919 - 1949 (Altbau)"
  }, 
  Pre1964: {
    id: "Spanneneinordnung.constructionDateGuessedPre1964",
    defaultMessage: "1950 - 1964"
  }, 
  Pre1972: {
    id: "Spanneneinordnung.constructionDateGuessedPre1972",
    defaultMessage: "1965 - 1972"
  }, 
  Pre1990: {
    id: "Spanneneinordnung.constructionDateGuessedPre1990",
    defaultMessage: "1973 - 1990"
  }, 
  Pre2002: {
    id: "Spanneneinordnung.constructionDateGuessedPre2002",
    defaultMessage: "1991 - 2002"
  }, 
  Pre2015: {
    id: "Spanneneinordnung.constructionDateGuessedPre2015",
    defaultMessage: "2003 - 31.12.2015"
  } 
});

const messages = defineMessages({
  title: {
    id: "Spanneneinordnung.constructionDate",
    defaultMessage: "Wann wurde das Haus gebaut?"
  }
});

class ConstructionDateInput extends React.Component {
	inputName: string = "constructionDate";

	constructor(props: AssistantInputProps) {
		super(props);
		autoBind(this);
	}

  componentDidMount() {
    if(this.props.value !== undefined) this.props.valid(this.inputName, true);
  }

	handleChange(e: SyntheticInputEvent, value: string) {
    this.props.changed({[this.inputName]: value});
		this.props.valid("constructionDate", true, 
      () => this.props.valid("mietspiegel", false));
	}

	render() {
		const radioControls = radioOptions.map((rangeName, i) => <RadioButton
      key={"constructionDateOption-" + i}
			value={rangeName}
      label={this.props.intl.formatMessage(radioDescriptions[rangeName])} />)

		return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <RadioButtonGroup 
          name={this.inputName}
          onChange={this.handleChange}
          valueSelected={this.props.value} >
          {radioControls}
        </RadioButtonGroup>
      </CardText>
		</Card>;
	}
}

export default injectIntl(ConstructionDateInput);