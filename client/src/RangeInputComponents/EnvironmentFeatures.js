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
      defaultMessage: "Lage an einer besonders ruhigen Straße oder besonders ruhige Innenlage."
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

export const TrafficNoise = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.TrafficNoiseTitle",
      defaultMessage: "Verkehrslärm"
    },
    hint: {
      id: "Environment.TrafficNoiseTitleHint",
      defaultMessage: `Lage der Wohnung an einer Straße oder Schienenstrecke mit hoher Verkehrslärmbelastung 
      oder Belastung durch Flugverkehr nach Maßgabe der Erläuterungen zur Verkehrslärmbelastung`
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="TrafficNoise"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.hint} /></p>
    </CardText>
  </Card>;
});

export const CommercialNoise = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.CommercialNoiseTitle",
      defaultMessage: "Gewerbelärm und -gerüche"
    },
    hint: {
      id: "Environment.CommercialNoiseHint",
      defaultMessage: `Erhebliche, regelmäßige Beeinträchtigung durch 
        Geräusche oder Gerüche (Gewerbe) z.B. durch Liefer- und Kundenverkehr.`
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="CommercialNoise"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.hint} /></p>
    </CardText>
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

export const NeatoTrash = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.NeatoTrash",
      defaultMessage: "Gepflegte Müllstandfläche mit sichtbegrenzender Gestaltung, die nur den Mietern zugänglich ist."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NeatoTrash"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NeglectedTrash = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.NeglectedTrash",
      defaultMessage: "Ungepflegte und offene Müllstandsfläche"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NeglectedTrash"
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
      defaultMessage: `Zum Beispiel Sitzbänke oder Ruhezonen, neu angelegte 
        Wegebefestigung mit Grünflächen.`
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

export const MansionStyle = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.MansionStyle",
      defaultMessage: "Villenartige Mehrfamilienhäuser"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="MansionStyle"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});