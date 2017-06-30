// @flow

import React from 'react';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';

type RangeInputProps = {
  changed: (string, string) => any,
  intl: intlShape 
};

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
      />} />
  </Card>;
});

export const TrafficNoise = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.TrafficNoiseTitle",
      defaultMessage: "Verkehrslärm"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <p>Lage der Wohnung an einer Straße oder Schienenstrecke mit hoher Verkehrslärmbelastung 
      oder Belastung durch Flugverkehr nach Maßgabe der Erläuterungen zur Verkehrslärmbelastung</p>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="TrafficNoise"
        positive={false}
        message="applies"
      />
    </CardActions>
  </Card>;
});

export const CommercialNoise = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.CommercialNoiseTitle",
      defaultMessage: "Gewerbelärm und -gerüche"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <p>Erhebliche, regelmäßige Beeinträchtigung durch Geräusche oder Gerüche (Gewerbe) z.B. durch Liefer- und Kundenverkehr.</p>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="CommercialNoise"
        positive={false}
        message="applies"
      />
    </CardActions>
  </Card>;
});

export const PrimeDowntown = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.PrimeDowntown",
      defaultMessage: "Bevorzugte Citylage"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="PrimeDowntown"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
    <CardText>
      <p>Nahe repräsentativen, überregional ausstrahlenden Einkaufs-, Dienstleistungs- und Wohnstandorten.</p>
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
      />} />
  </Card>;
});

export const NeatoBackyard = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Environment.NeatoBackyard",
      defaultMessage: "Aufwändig gestaltetes Wohnumfeld auf dem Grundstück"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NeatoBackyard"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
    <CardText>
      <p>Zum Beispiel Sitzbänke oder Ruhezonen, neu angelegte Wegebefestigung mit Grünflächen.</p>
    </CardText>
  </Card>;
});

export const PrivateBackyard = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Environment.PrivateBackyardTitle",
      defaultMessage: "Garten"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <ul>
        <li>Garten zur alleinigen Nutzung</li>
        <li>Mietergarten ohne Entgelt</li>
        <li>Zur Wohnung gehörender Garten mit direktem Zugang</li>
      </ul>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="PrivateBackyard"
        positive={true}
        message="atLeastOne"
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
      />} />
  </Card>;
});