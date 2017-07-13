// @flow

import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type {RangeInputProps} from './RangeSelectionGroup';

export const WindowStyle = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.WindowStyle",
      defaultMessage: "Art der Fenster"
    },
    singlePane: {
      id: "Apartment.WindowStyleSingle",
      defaultMessage: "Mindestens die Hälfte der Fenster haben nur Einfachverglasung."
    },
    insulating: {
      id: "Apartment.WindowStyleInsulating",
      defaultMessage: "Mindestens die Hälfte der Fenster haben Isolierverglasung (Einbau ab 1987) oder Schallschutzfenster."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <CheckboxInput
        changed={props.changed}
        name="WindowStyle"
        positive={false}
        message={props.intl.formatMessage(messages.singlePane)}
        value={props.value}
      />
      <CheckboxInput
        changed={props.changed}
        name="WindowStyle"
        positive={true}
        message={props.intl.formatMessage(messages.insulating)}
        value={props.value}
      />
    </CardText>
  </Card>;
});

export const HighGradeFlooring = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.HighGradeFlooring",
      defaultMessage: "Hochwertiges Parkett, Natur-/Kunststein Fliesen oder gleichwertiger Boden/-belag in der überwiegenden Zahl der Wohnräume (Als Sondermerkmal)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="HighGradeFlooring"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const InsufficientPower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.InsufficientPower",
      defaultMessage: "Unzureichende Elektroinstallation: Kein gleichzeitiger Betrieb von mindestens zwei haushaltsüblichen größeren Elektrogeräten (z.B. Waschmaschine und Staubsauger) möglich oder weniger als zwei Steckdosen in Wohnräumen."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="InsufficientPower"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const WallInstallation = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.WallInstallation",
      defaultMessage: "Versorgungsleitungen"
    },
    electrical: {
      id: "Apartment.WallInstallationElectrical",
      defaultMessage: "Elektroinstallation überwiegend sichtbar auf Putz"
    },
    drainage: {
      id: "Apartment.WallInstallationDrainage",
      defaultMessage: "Be- und Entwässerungsinstallation überwiegend auf Putz"
    },
    heating: {
      id: "Apartment.WallInstallationHeating",
      defaultMessage: "Heizungsrohre überwiegend _unter_ Putz"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <CheckboxInput
        changed={props.changed}
        name="WallInstallationElectrical"
        positive={false}
        message={props.intl.formatMessage(messages.electrical)}
        value={props.value}
      />
      <CheckboxInput
        changed={props.changed}
        name="WallInstallationDrainage"
        positive={false}
        message={props.intl.formatMessage(messages.drainage)}
        value={props.value}
      />
      <CheckboxInput
        changed={props.changed}
        name="WallInstallationHeating"
        positive={true}
        message={props.intl.formatMessage(messages.heating)}
        value={props.value}
      />
    </CardText>
  </Card>;
});

export const ColdWaterMetering = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.ColdWaterMetering",
      defaultMessage: "Wohnungsbezogener Kaltwasserzähler, für dessen Miete oder Leasing nicht im Rahmen der Betriebskosten gezahlt wird."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="ColdWaterMetering"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const BadFlatDesign = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.BadFlatDesign",
      defaultMessage: "Schlechter Schnitt (z.B. mehr als ein gefangenes Zimmer)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BadFlatDesign"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const StorageCabinet = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.StorageCabinet",
      defaultMessage: "Einbauschrank oder Abstellraum mit Sichtschutz innerhalb der Wohnung"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="StorageCabinet"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoSpaceForWashing = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.NoSpaceForWashing",
      defaultMessage: "Waschmaschine weder in Bad noch Küche stellbar oder nicht anschließbar."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoSpaceForWashing"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const LargeLiving = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.LargeLiving",
      defaultMessage: "Ein Wohnraum größer als 40 m²."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="LargeLiving"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const AccessibleDesign = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.AccessibleDesign",
      defaultMessage: "Barrierearme Wohnungsgestaltung (Schwellenfreiheit in der Wohnung, schwellenarmer Übergang zu Balkon/Terrasse, ausreichende Bewegungsfreiheit in der Wohnung und/oder barrierearme Badgestaltung)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="AccessibleDesign"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoBalcony = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.NoBalcony",
      defaultMessage: "Es gibt keinen Balkon (das Merkmal gilt nicht, wenn der Balkon aus baulichen und/oder rechtlichen Gründen nicht möglich oder nicht zulässig ist)."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoBalcony"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const SpaciousBalcony = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.SpaciousBalcony",
      defaultMessage: "Großer, geräumiger Balkon, (Dach-)Terrasse, Loggia oder Wintergarten (ab 4 m²)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="SpaciousBalcony"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const RollingShutters = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.RollingShutters",
      defaultMessage: "Rollläden"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="RollingShutters"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const FloorHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.FloorHeating",
      defaultMessage: "Überwiegend Fußbodenheizung"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="FloorHeating"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const CeilingDecoration = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.CeilingDecoration",
      defaultMessage: "Aufwändige Deckenverkleidung (z.B. Stuck) oder getäfelte Wandverkleidung in gutem Zustand in der überwiegenden Anzahl der Wohnräume"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="CeilingDecoration"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoBroadband = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.NoBroadband",
      defaultMessage: "Weder Breitbandanschluss noch Gemeinschaftssatelliten- / Antennenanlage"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoBroadband"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const BidirectionalBroadband = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.BidirectionalBroadband",
      defaultMessage: "Rückkanalfähiger Breitbandanschluss (Nutzung ohne zusätzliche vertragliche Bindung des Mieters mit Dritten)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BidirectionalBroadband"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});
