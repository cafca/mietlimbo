// @flow

import React from 'react'
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl'
import { CardText} from 'material-ui/Card'

import CheckboxInput from './CheckboxInput'
import type { RangeInputProps } from './RangeSelectionGroup'
import FeatureInput from './FeatureInput'

import './Styles.css'

export const NoVentilation = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.NoVentilation',
      defaultMessage: 'Die Küche hat weder ein Fenster, noch eine ausreichende Entlüftung.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="NoVentilation"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const ExtractorHood = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.ExtractorHood',
      defaultMessage: 'Es gibt einen Dunstabzug.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="ExtractorHood"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const NoHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.NoHeating',
      defaultMessage: 'Die Küche ist nicht beheizbar oder hat nur eine Holz- oder Kohleheizung.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="NoHeating"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const HighGradeFloor = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.HighGradeFloor',
      defaultMessage: 'Hochwertiger Bodenbelag.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="HighGradeFloor"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} >
    <CardText className="cardText">
      <p>
        <FormattedMessage 
          id="Kitchen.HighGradeFloorExamples" 
          defaultMessage="Dazu zählen hochwertige Fliesen, hochwertiges Linoleum, hochwertiges Feuchtraumlaminat, Parkett oder Terrazzo, jeweils in gutem Zustand." 
        />
      </p>
    </CardText>
  </FeatureInput>
})

export const FittedKitchen = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.FittedKitchen',
      defaultMessage: 'Es gibt eine Einbauküche mit Ober- und Unterschränken sowie Herd und Spüle.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="FittedKitchen"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const KitchenLiving = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.KitchenLiving',
      defaultMessage: 'Die Küche ist ein separater Raum mit mindestens 14 Quadratmeter Grundfläche.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="KitchenLiving"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const NoStove = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.NoStove',
      defaultMessage: 'Es gibt keine Kochmöglichkeit oder keinen Backofen.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="NoStove"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const HighGradeStove = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.HighGradeStove',
      defaultMessage: 'Es gibt ein Ceran- oder Induktionskochfeld.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="HighGradeStove"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const NoSink = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.NoSink',
      defaultMessage: 'Es gibt keine Spüle.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="NoSink"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const NoDishwasherSpace = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.NoDishwasherSpace',
      defaultMessage: 'Ein Geschirrspüler lässt sich nicht abstellen oder nicht anschließen.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="NoDishwasherSpace"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const FreezerProvided = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.FreezerProvided',
      defaultMessage: 'Es gibt bereits einen Kühlschrank in der Wohnung.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="FreezerProvided"
    positive={true}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} 
  />
})

export const InsufficientWarmWater = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: 'Kitchen.InsufficientWarmWater',
      defaultMessage: 'Es gibt keine ausreichende Warmwasserversorgung.'
    }
  })
  return <FeatureInput title={<CheckboxInput
    changed={props.changed}
    name="InsufficientWarmWater"
    positive={false}
    message={props.intl.formatMessage(messages.title)}
    value={props.value}
  />} >
    <CardText className="cardText">
      <p>
        <FormattedMessage 
          id="Kitchen.InsufficientWarmWaterExamples" 
          defaultMessage="Dies kann zum Beispiel bedeuten: Keine zentrale Warmwasserversorgung, kein Durchlauferhitzer, kein Boiler an der Spüle." 
        />
      </p>
    </CardText>
  </FeatureInput>
})

