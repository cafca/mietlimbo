// @flow

import React from 'react'
import autoBind from 'react-autobind'
import { injectIntl, defineMessages } from 'react-intl'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import { constructionDateOptionsTranslations } from '../GenericTranslations'
import type { AssistantInputProps } from '../Types'

export const radioOptions = [
  'Pre1918',
  'Pre1949',
  'Pre1964',
  'Pre1972',
  'Pre1990',
  'Pre2002',
  'Pre2015'
]

const messages = defineMessages({
  title: {
    id: 'Spanneneinordnung.constructionDate',
    defaultMessage: 'Wann wurde das Haus gebaut?'
  }
})

class ConstructionDateInput extends React.Component {
  inputName: string = 'constructionDate'

  constructor(props: AssistantInputProps) {
    super(props)
    autoBind(this)
  }

  componentDidMount() {
    if (this.props.value !== undefined) this.props.valid(this.inputName, true)
  }

  handleChange(e: SyntheticInputEvent<HTMLInputElement>, value: string) {
    this.props.changed({ [this.inputName]: value })
    this.props.valid('constructionDate', true, () =>
      this.props.valid('mietspiegel', false)
    )
  }

  render() {
    const radioControls = radioOptions.map((rangeName, i) => (
      <RadioButton
        key={'constructionDateOption-' + i}
        value={rangeName}
        label={this.props.intl.formatMessage(
          constructionDateOptionsTranslations[rangeName]
        )}
      />
    ))

    return (
      <Card className="assistantInput" id={this.inputName}>
        <CardTitle title={this.props.intl.formatMessage(messages.title)} />
        <CardText>
          <RadioButtonGroup
            name={this.inputName}
            onChange={this.handleChange}
            valueSelected={this.props.value}
          >
            {radioControls}
          </RadioButtonGroup>
        </CardText>
      </Card>
    )
  }
}

export default injectIntl(ConstructionDateInput)
