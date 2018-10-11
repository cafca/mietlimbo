// @flow

import React from 'react'
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl'

const Mietwucher = (props: {rent: number, mpbRent: number}) => {
  const messages = defineMessages({
    title: {
      id: 'FinalResult.MietwucherTitle',
      defaultMessage: 'Mietwucher'
    },
    explanation: {
      id: 'FinalResult.MietwucherExplanation',
      defaultMessage: `Mietwucher liegt unter bestimmten Umständen vor, wenn die ortsübliche Vergleichsmiete 
        um mehr als 50% überschritten wird. Im Gegensatz zu einer Überschreitung der nach Mietpreisbremse zulässigen
        Miete, steht Mietwucher unter Strafe! Auch eine Überschreitung von mehr als 20% wird unter bestimmten
        Umständen als unzulässige Mietpreisüberhöhung mit einer Geldbuße belegt. Zu Details hierzu siehe {infoPage}.`
    },
    calculation: {
      id: 'FinalResult.MietwucherCalculation',
      defaultMessage: `Deine Miete von {rent, number, currency} überschreitet die örtliche Vergleichsmiete von 
        {mpbRent, number, currency} um {percentage, number} %.`
    }
  })

  const values = {
    infoPage: <a href="http://www.stadtentwicklung.berlin.de/wohnen/mieterfibel/de/m_miete10.shtml" target="_blank" rel="noopener noreferrer">
      Senatsverwaltung: Mietwucher
    </a>,
    rent: props.rent,
    mpbRent: props.mpbRent,
    percentage: (props.rent / props.mpbRent) * 100.00 - 100.00
  }

  return values.percentage > 20 ? <section>
    <h3><FormattedMessage {...messages.title} /></h3>
    <p><FormattedMessage {...messages.explanation} values={values} /></p>
    <p><FormattedMessage {...messages.calculation} values={values} /></p>  
  </section> : null
}

export default injectIntl(Mietwucher)