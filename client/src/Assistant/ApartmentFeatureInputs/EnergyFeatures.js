// @flow

import React from 'react'
import autoBind from 'react-autobind'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked'
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'

import type { RangeInputProps } from './RangeSelectionGroup'

import './Styles.css'

// 
// This class is a bit of a hack: All other features are boolean in that
// that they either apply or not, while energy is also boolean in that it either
// raises or lowers the rent, but also not boolean in that there are several 
// ranges into which energy consumption can fall as well as three options that
// modify these ranges.
// 
// To deal with this, two separate features 'EnergyGood' and 'EnergyBad' are
// stored, which raise and lower the rent respectively and are mutually 
// exclusive. Additionally, an object is stored in the Building data under the 
// key `energyValue`, which holds detailed info on the selected options, which
// includes the exact selected range, as well as any modifying options selected.

type EnergyInputProps = RangeInputProps & {
  directValue: {
    "Energy": {
      endenergiebedarf: boolean,
      decentralEnergy: boolean,
      historicSite: boolean,
      valueSelected: string
    }
  }
};

const messages = defineMessages({
  Title: {
    id: 'Building.EnergyTitle',
    defaultMessage: 'Energieverbrauch'
  },
  Introduction: {
    id: 'Building.EnergyIntroduction',
    defaultMessage: `In diesem Merkmal wird der Energieverbrauch des Gebäudes erfasst, 
    welcher sich aus dem Verbrauch für Heizung und Warmwasser zusammensetzt. Du findest
    den Energieverbrauchskennwert in deinen Heizkostenabrechnungen oder in einem Energieausweis.
    Leider ist es sehr kompliziert, diesen Wert zu berechnen, wenn du ihn auf diese
    Weise nicht einfach ablesen kannst. Hierzu hat der Berliner Mieterverein eine 
    umfangreiche Infoseite zusammengestellt ({link}).`
  },
  Endenergiebedarf: {
    id: 'Building.Endenergiebedarf',
    defaultMessage: `Kennst du nur den Endenergiebedarf? Wenn du diese Option wählst, 
    erhöhen sich die Einordnungs-Grenzen um 20%`
  },
  EndenergiebedarfLabel: {
    id: 'Building.EndenergiebedarfLabel',
    defaultMessage: 'Ich kenne nur den Endenergiebedarf'
  },
  DecentralEnergy: {
    id: 'Building.DecentralEnergy',
    defaultMessage: `Wird das Warmwasser dezentral, zum Beispiel über einen 
    Durchlauferhitzer, dort erwärmt, wo es gebraucht wird, statt an einer 
    zentralen Stelle in der Wohnung? In diesem Fall werden auf die 
    Verbrauchsgrenzen pauschal 20 kWh/(m²a) aufgeschlagen.`
  },
  DecentralEnergyLabel: {
    id: 'Building.DecentralEnergyLabel',
    defaultMessage: 'Dezentrale Warmwasserversorgung'
  },
  HistoricSite: {
    id: 'Building.HistoricSite',
    defaultMessage: `Wenn deine Wohnung in einem denkmalgeschützten Gebäude 
    liegt, gilt hier eine Sonderregelung: Wird durch damit verbundene Auflagen
    nämlich eine energetische Sanierung verhindert, oder unverhältnismäßig teuer,
    dann wird der Energieverbrauch nicht mehr für die Einordnung berücksichtigt.`
  },
  HistoricSiteLabel: {
    id: 'Building.HistoricSiteLabel',
    defaultMessage: `Denkmalschutz verhindert energetische Sanierung oder 
      erschwert diese finanziell erheblich.`
  },
  RadioIntro: {
    id: 'Building.RadiobuttonGroupTitle',
    defaultMessage: 'Der Energieverbrauch beträgt:'
  },
  Sub80: {
    id: 'Building.EnergySub80',
    defaultMessage: 'Unter {Sub80} kWh/(m²a)'
  },
  Sub100: {
    id: 'Building.EnergySub100',
    defaultMessage: 'Unter {Sub100} kWh/(m²a)'
  },
  Sub120: {
    id: 'Building.EnergySub120',
    defaultMessage: 'Unter {Sub120} kWh/(m²a)'
  },
  Super155: {
    id: 'Building.EnergySuper155',
    defaultMessage: 'Über {Super155} kWh/(m²a)'
  },
  Super195: {
    id: 'Building.EnergySuper195',
    defaultMessage: 'Über {Super195} kWh/(m²a)'
  },
  Super235: {
    id: 'Building.EnergySuper235',
    defaultMessage: 'Über {Super235} kWh/(m²a)'
  },
  InsufficientInsulationLabel: {
    id: 'EnergyFeatures.InsufficientInsulationLabel',
    defaultMessage: 'Unzureichende Wärmedämmung oder Heizanlage mit ungünstigem Wirkungsgrad'
  },
  InsufficientInsulationHint: {
    id: 'EnergyFeatures.InsufficientInsulationHint',
    defaultMessage: '(Einbau vor 1988)'
  },
  ModernizedHeatingSystemLabel: {
    id: 'EnergyFeatures.ModernizedHeatingSystemLabel',
    defaultMessage: 'Wärmedämmung zusätzlich zur Bausubstanz oder modernisierte Anlage'
  },
  ModernizedHeatingSystemHint: {
    id: 'EnergyFeatures.ModernizedHeatingSystemHint',
    defaultMessage: 'Heizanlagen sind modern, wenn sie ab 1.1.2003 eingebaut wurden und das Haus/Gebäude schon vorher bezugsfertig war.'
  },
  UnknownHeatingLabel: {
    id: 'EnergyFeatures.UnknownHeatingLabel',
    defaultMessage: 'Ich weiß überhaupt nichts über den Energieverbrauch und möchte dieses Merkmal überspringen.'
  }
})

const radioIcons = {
  checkedIcon: <RadioButtonChecked />,
  uncheckedIcon: <RadioButtonUnchecked />
}

export default class EnergyClass extends React.Component {
  baseLimits = {
    'Sub80': 80,
    'Sub100': 100,
    'Sub120': 120,
    'Super155': 155,
    'Super195': 195,
    'Super235': 235
  }

  inputName: string = 'Energy'

  constructor(props: EnergyInputProps) {
    super(props)
    autoBind(this)
  }

  getLimits() {
    // Calculate the current limits for energy consumption based on the selected
    // options.
    const customLimits = {}
    // eslint-disable-next-line array-callback-return
    Object.keys(this.baseLimits).map(k => {
      customLimits[k] = this.baseLimits[k] 
        * (this.props.directValue.energyValue !== undefined 
          && this.props.directValue.energyValue.endenergiebedarf ? 1.2 : 1)
        + (this.props.directValue.energyValue !== undefined 
          && this.props.directValue.energyValue.decentralEnergy ? 20 : 0)
    })
    return customLimits
  }

  saveOption(optionName: string, value: any, cb: ?() => any) {
    // Save options by merging them into the data object for the Building
    // feature group under the 'energyValue' key. Options that don't affect the end
    // result need to be stored this way.
    const energyValue = this.props.directValue.energyValue !== undefined
      ? Object.assign({}, this.props.directValue.energyValue, {[optionName]: value})
      : {[optionName]: value}
    const Gebäude = Object.assign(
      {}, this.props.directValue, {energyValue})
    this.props.directChanged({Gebäude}, cb)
  }

  applyFeatures(applicableFeatures: Array<string>) {
    // Update the list of energy related features to only include those passed in with the
    // applicableFeatures param.

    const featureList = Object.keys(this.baseLimits)
      .concat(['ModernizedHeatingSystem', 'InsufficientInsulation'])

    const isPositive = name => name.slice(0, 3) === 'Sub' || name === 'ModernizedHeatingSystem'

    // Function to recursively update each item in `featureList`
    const applyFeaturesRec = () => {
      if (featureList.length > 0) {
        const cur = featureList.pop()
        // console.log('Changing', cur, applicableFeatures.indexOf(cur) >= 0 )
        this.props.changed(
          cur, 
          isPositive(cur), 
          applicableFeatures.indexOf(cur) >= 0, 
          applyFeaturesRec
        )
      }
    }
    applyFeaturesRec()
  }

  handleChange(value: string) {
    // Handler for direct selection of an energy value

    const featureList = Object.keys(this.baseLimits)
    const isPositive = name => name.slice(0, 3) === 'Sub'

    // Make an array of applicable features for this selection
    const selectedIndex = featureList.indexOf(value)
    const applicableFeatures = isPositive(value)
      ? featureList.slice(selectedIndex, 3)
      : featureList.slice(3, selectedIndex + 1)

    this.saveOption('UnknownHeating', false, () => {
      this.applyFeatures(applicableFeatures)
    })
  }

  handleGenericChange(value: string) {
    // Handler for generic options

    // `UnknownHeating` and all other options are mutually exclusive
    if (value === 'UnknownHeating') {
      this.saveOption(value, true, () => {
        this.applyFeatures([])
      })
    } else {
      this.saveOption('UnknownHeating', false, () => {
        this.applyFeatures([value])
      })
    }
  }

  handleOptionChange(option: string, value: boolean) {
    this.saveOption(option, value, () => {
      // Reset all other options for historic sites
      if (option === 'historicSite' && value) this.applyFeatures([])
    })
  }

  render() {
    if (this.props.directValue === undefined) return <p>Nothing</p>
    const energyValue = this.props.directValue.energyValue || {}
    const checkedValues = this.props.directValue.negative.concat(this.props.directValue.positive)

    const customLimits = this.getLimits()
    const directOptions = Object.keys(this.baseLimits).map(k => 
      <Checkbox 
        checked={checkedValues.indexOf(k) >= 0}
        onCheck={() => this.handleChange(k)}
        disabled={energyValue.historicSite === true}
        label={this.props.intl.formatMessage(messages[k], customLimits)} 
        key={k}
        {...radioIcons} 
      />)

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.Title)} />
      <CardText className="cardText">
        <p><FormattedMessage {...messages.Introduction} values={{
          link: <a href="http://www.berliner-mieterverein.de/recht/infoblaetter/fl196.htm" target="_blank" rel="noopener noreferrer">
            Berliner Mieterverein Info 196
          </a>
        }} /></p>
      </CardText>

      <Divider />

      <CardText className="cardText">
        <h3>Sonderfälle</h3>
        <p><FormattedMessage {...messages.HistoricSite} /></p>
        <Checkbox 
          checked={energyValue.historicSite === true} 
          onCheck={(ev, value) => this.handleOptionChange('historicSite', value)}
          label={this.props.intl.formatMessage(messages.HistoricSiteLabel)} />
        <p><FormattedMessage {...messages.Endenergiebedarf} /></p>
        <Checkbox 
          checked={energyValue.endenergiebedarf === true} 
          onCheck={(ev, value) => this.handleOptionChange('endenergiebedarf', value)} 
          disabled={energyValue.historicSite === true}
          label={this.props.intl.formatMessage(messages.EndenergiebedarfLabel)} />
        <p><FormattedMessage {...messages.DecentralEnergy} /></p>
        <Checkbox 
          checked={energyValue.decentralEnergy === true} 
          onCheck={(ev, value) => this.handleOptionChange('decentralEnergy', value)} 
          disabled={energyValue.historicSite === true}
          label={this.props.intl.formatMessage(messages.DecentralEnergyLabel)} />
      </CardText>

      <Divider />

      <CardText className="cardText">
        <h3>Einordnung</h3>
        <p>Pauschale Einordnung</p>
        <Checkbox
          checked={checkedValues.indexOf('InsufficientInsulation') >= 0}
          onCheck={() => this.handleGenericChange('InsufficientInsulation')}
          disabled={energyValue.historicSite === true}
          label={<span>
            <FormattedMessage {...messages.InsufficientInsulationLabel} /><br />
            <span className="optionHint">
              <FormattedMessage {...messages.InsufficientInsulationHint} className="optionHint" />
            </span>
          </span>}
          {...radioIcons} />
        <Checkbox
          checked={checkedValues.indexOf('ModernizedHeatingSystem') >= 0}
          onCheck={() => this.handleGenericChange('ModernizedHeatingSystem')}
          disabled={energyValue.historicSite === true}
          label={<span>
            <FormattedMessage {...messages.ModernizedHeatingSystemLabel} /><br />
            <span className="optionHint">
              <FormattedMessage {...messages.ModernizedHeatingSystemHint} className="optionHint" />
            </span>
          </span>}
          {...radioIcons} />
        <Checkbox
          checked={energyValue.UnknownHeating === true}
          onCheck={() => this.handleGenericChange('UnknownHeating')}
          disabled={energyValue.historicSite === true}
          label={this.props.intl.formatMessage(messages.UnknownHeatingLabel)}
          {...radioIcons} />
        <p><FormattedMessage {...messages.RadioIntro} /></p>
        {directOptions}
      </CardText>
    </Card>
  }
}