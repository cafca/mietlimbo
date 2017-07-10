// @flow

import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import {Card, CardTitle} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type {RangeInputProps} from './RangeSelectionGroup';

export const NoVentilation = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoVentilation",
      defaultMessage: "Die Küche hat weder ein Fenster, noch eine ausreichende Entlüftung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoVentilation"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const ExtractorHood = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.ExtractorHood",
      defaultMessage: "Es gibt eine Dunstabzugshaube."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="ExtractorHood"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoHeating",
      defaultMessage: "Die Küche ist nicht beheizbar oder hat nur eine Holz- oder Kohleheizung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoHeating"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const HighGradeFloor = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.HighGradeFloor",
      defaultMessage: "Als Bodenbelag gibt es hochwertige Fliesen, hochwertiges Linoleum, hochwertiges Feuchtraumlaminat, Parkett oder Terrazzo in gutem Zustand."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="HighGradeFloor"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const FittedKitchen = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.FittedKitchen",
      defaultMessage: "Es gibt eine Einbauküche mit Ober- und Unterschränken sowie Herd und Spüle."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="FittedKitchen"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const KitchenLiving = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.KitchenLiving",
      defaultMessage: "Die Küche ist ein separater Raum mit mindestens 14 Quadratmeter Grundfläche und damit eine Wohnküche."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="KitchenLiving"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoStove = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoStove",
      defaultMessage: "Es gibt keine Kochmöglichkeit."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoStove"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoOven = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoOven",
      defaultMessage: "Es gibt einen Gas- oder Elektroherd, aber ohne Backofen."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoOven"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const HighGradeStove = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.HighGradeStove",
      defaultMessage: "Es gibt ein Ceran- oder Induktionskochfeld."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="HighGradeStove"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoSink = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoSink",
      defaultMessage: "Es gibt keine Spüle."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoSink"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoDishwasherSpace = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.NoDishwasherSpace",
      defaultMessage: "Ein Geschirrspüler lässt sich nicht abstellen oder nicht anschließen."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoDishwasherSpace"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const FreezerProvided = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.FreezerProvided",
      defaultMessage: "Es gibt bereits einen Kühlschrank in der Wohnung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="FreezerProvided"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const InsufficientWarmWater = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Kitchen.InsufficientWarmWater",
      defaultMessage: "Es gibt keine ausreichende Warmwasserversorgung (keine zentrale Warmwasserversorgung, kein Durchlauferhitzer, kein Boiler an der Spüle)."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="InsufficientWarmWater"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

