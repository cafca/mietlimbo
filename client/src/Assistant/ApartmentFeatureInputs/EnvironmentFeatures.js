// @flow

import React from 'react';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type {RangeInputProps} from './RangeSelectionGroup';

import './Styles.css';

export const QuietStreet = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.QuietStreet",
      defaultMessage: "Besonders ruhige Lage"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="QuietStreet"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const Noisy = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.NoisyTitle",
      defaultMessage: "Besonders lärmbelastete Lage"
    },
    hint: {
      id: "Environment.NoisyTitleHint",
      defaultMessage: `Ein Indiz hierfür kann die Ausweisung einer hohen 
        Verkehrslärmbelastung gemäß {link} sein.
        (wird automatisch ausgefüllt)`
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="Noisy"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.hint} values={{
        link: <a href="http://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/de/laermwerte.shtml" target="_blank" rel="noopener noreferrer">Erläuterungen zur Verkehrslärmbelastung</a>
      }}/></p>
    </CardText>
  </Card>;
});

export const Smelly = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.SmellyTitle",
      defaultMessage: "Besonders geruchsbelastete Lage"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="Smelly"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const PrimeDowntown = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.PrimeDowntown",
      defaultMessage: "Bevorzugte Citylage"
    },
    hint: {
      id: "Environment.PrimeDowntownHint",
      defaultMessage: `Nahe repräsentativen, überregional ausstrahlenden Einkaufs-, 
        Dienstleistungs- und Wohnstandorten.`
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="PrimeDowntown"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText>
      <p><FormattedMessage {...messages.hint} /></p>
    </CardText>
  </Card>;
});

export const NeglectedArea = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.NeglectedArea",
      defaultMessage: "Lage in stark vernachlässigter Umgebung in einfacher Wohnlage."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NeglectedArea"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NeatoBackyard = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.NeatoBackyard",
      defaultMessage: "Aufwändig gestaltetes Wohnumfeld auf dem Grundstück"
    },
    hint: {
      id: "Environment.NeatoBackyardHint",
      defaultMessage: `Zum Beispiel Kinderspielplatz – bei Bezugsfertigkeit des Gebäudes 
        vor 2003, Sitzbänke oder Ruhezonen, gute Gehwegbefestigung mit Grünflächen 
        und Beleuchtung.`
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NeatoBackyard"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText>
      <p><FormattedMessage {...messages.hint} /></p>
    </CardText>
  </Card>;
});

export const PrivateBackyard = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.PrivateBackyardTitle",
      defaultMessage: "Garten"
    },
    option1: {
      id: "Environment.PrivateBackyard1",
      defaultMessage: "Garten zur alleinigen Nutzung"
    },
    option2: {
      id: "Environment.PrivateBackyard2",
      defaultMessage: "Mietergarten ohne Entgelt"
    },
    option3: {
      id: "Environment.PrivateBackyard3",
      defaultMessage: "Zur Wohnung gehörender Garten mit direktem Zugang"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText className="cardText">
      <ul>
        <li><FormattedMessage {...messages.option1} /></li>
        <li><FormattedMessage {...messages.option2} /></li>
        <li><FormattedMessage {...messages.option3} /></li>
      </ul>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="PrivateBackyard"
        positive={true}
        message="atLeastOne"
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const Parking = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.Parking",
      defaultMessage: "PKW-Parkplatzangebot in der Nähe und vom Vermieter gestellt"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="Parking"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const BicycleParking = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.BicycleRoom",
      defaultMessage: "Keine Fahrradabstellmöglichkeit auf dem Grundstück"
    }
  });
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BicycleParking"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});