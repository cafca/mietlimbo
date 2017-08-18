// @flow

import React from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { Card, CardTitle, CardText } from 'material-ui/Card';

type RenovationCaseProps = {
  renovationInput: string, 
  rent: number,
  mpbRent: number,
  intl: Object
};

const RenovationCase = (props: RenovationCaseProps) => {
  if (props.renovationInput !== "simple") {
    return null;
  } else {
    const messages = defineMessages({
      title: {
        id: "RenovationCase.title",
        defaultMessage: "Sanierungskosten"
      },
      description: {
        id: "RenovationCase.description",
        defaultMessage: `Du hast angegeben, dass eine Sanierung bzw. Modernisierung durchgeführt wurde. Der Vermieter darf 
          pro Jahr 11% der dafür angefallenen Investitionskosten auf die nach Mietpreisbremse _vor_ der Sanierung zulässige Miete aufschlagen:`
      },
      formula: {
        id: "RenovationCase.formula",
        defaultMessage: "Ortsübliche Vergleichsmiete vor Sanierung + 10% + (11% der Sanierungskosten / 12 Monate) = Zulässige Miete"
      },
      calculation: {
        id: "RenovationCase.calculation",
        defaultMessage: `Wenn du die Fragen auf dieser Seite dem Zustand der Wohnung vor den Sanierungs-/Modernisierungsarbeiten entsprechend 
          beantwortet hast, ist deine Miete von {currentRent, number, currency} also gerechtfertigt bei Sanierungskosten von mindestens
          (Jetzige Miete - (Ortsübliche Vergleichsmiete + 10%)) * 12/0,11 ≈ {renovationCost, number, currency}. Ist das glaubwürdig?`
      }
    });

    const calculation = {
      currentRent: props.rent,
      mpbRent: props.mpbRent,
      renovationCost: (props.rent - props.mpbRent) * 12.0 / 0.11
    };

    return <Card>
      <CardTitle title={props.intl.formatMessage(messages.title)} />
      <CardText>
        <p><FormattedMessage {...messages.description} /></p>
        <p><FormattedMessage {...messages.formula} /></p>
        <p><FormattedMessage values={calculation} {...messages.calculation} /></p>
      </CardText>
    </Card>;
  }
}

export default injectIntl(RenovationCase);