// @flow

import React from 'react';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type {RangeInputProps} from './RangeSelectionGroup';

import './Styles.css';

export const WindowStyleSingle = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.WindowStyleSingle",
      defaultMessage: "Mehr als die Hälfte der Fenster haben nur Einfachverglasung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="WindowStyleSingle"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const WindowStyleInsulating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.WindowStyleInsulating",
      defaultMessage: "Hochwertige Fenster."
    },
    explanation1: {
      id: "Apartment.WindowStyleInsulating",
      defaultMessage: "Überwiegend Wärmeschutzverglasung (Einbau ab 1995) oder"
    },
    explanation2: {
      id: "Apartment.WindowStyleInsulating",
      defaultMessage: "Schallschutzfenster für Wohngebäude/Wohnungen, die vor 1995 bezugsfertig geworden sind"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="WindowStyleInsulating"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <ul>
        <li><FormattedMessage {...messages.explanation1} /></li>
        <li><FormattedMessage {...messages.explanation2} /></li>
      </ul>
    </CardText>
  </Card>;
});

export const HighGradeFlooring = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.HighGradeFlooring",
      defaultMessage: "Hochwertiger Bodenbelag in der überwiegenden Zahl der Wohnräume"
    },
    example1: {
      id: "Apartment.HighGradeFlooringExample1",
      defaultMessage: "Hochwertiges Parkett"
    },
    example2: {
      id: "Apartment.HighGradeFlooringExample2",
      defaultMessage: "Hochwertiger Natur- oder Kunststein"
    },
    example3: {
      id: "Apartment.HighGradeFlooringExample3",
      defaultMessage: "Hochwertige Fliesen"
    },
    example4: {
      id: "Apartment.HighGradeFlooringExample4",
      defaultMessage: "Oder gleichwertiger Bodenbelag"
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
    <CardText className="cardText">
      <ul>
        <li><FormattedMessage {...messages.example1} /></li>
        <li><FormattedMessage {...messages.example2} /></li>
        <li><FormattedMessage {...messages.example3} /></li>
        <li><FormattedMessage {...messages.example4} /></li>
      </ul>
    </CardText>
  </Card>;
});

export const InsufficientPower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.InsufficientPower",
      defaultMessage: "Unzureichende Elektroinstallation"
    },
    hint: {
      id: "Apartment.InsufficientPowerHint",
      defaultMessage: `Zum Beispiel keine ausreichende Elektrosteigleitung und/oder 
        VDE gerechte Elektroinstallation (z.B. kein FI-Schalter, Potentialausgleich)`
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
    <CardText className="cardText">
      <p><FormattedMessage {...messages.hint} /></p>
    </CardText>
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
      defaultMessage: "Heizungsrohre überwiegend _nicht_ sichtbar"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText className="cardText">
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
      defaultMessage: "Wohnungsbezogener Kaltwasserzähler"
    },
    explanation: {
      id: "Apartment.ColdWaterMeteringExplanation",
      defaultMessage: "Gilt nur, wenn die Wohnung vor 1998 bezugsfertig war, und wenn du Miete oder Leasing des Zählers nicht über die Betriebskosten trägst."
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="ColdWaterMetering"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.explanation} /></p>
    </CardText>
  </Card>;
});

export const BadFlatDesign = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.BadFlatDesign",
      defaultMessage: "Schlechter Schnitt"
    },
    explanation: {
      id: "Apartment.BadFlatDesignExplanation",
      defaultMessage: `Gilt zum Beispiel, wenn zur Wohnung ein gefangener Raum 
        oder ein Durchgangszimmer gehört`
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BadFlatDesign"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.explanation} /></p>
    </CardText>
  </Card>;
});

export const StorageCabinet = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.StorageCabinet",
      defaultMessage: "Einbauschrank oder Abstellraum innerhalb der Wohnung"
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
      defaultMessage: "Barrierearme Wohnungsgestaltung"
    },
    explanation: {
      id: "Apartment.AccessibleDesignExplanation",
      defaultMessage: "Schwellenfreiheit in der Wohnung, schwellenarmer Übergang zu Balkon/Terrasse, ausreichende Bewegungsfreiheit in der Wohnung und/oder barrierearme Badgestaltung"
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
    <CardText className="cardText">
      <p><FormattedMessage {...messages.explanation} /></p>
    </CardText>
  </Card>;
});

export const NoBalcony = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.NoBalcony",
      defaultMessage: "Es gibt keinen Balkon, (Dach-)Terrasse, Loggia und Winter-/Dachgarten"
    },
    explanation: {
      id: "Apartment.NoBalconyExplanation",
      defaultMessage: "Gilt nicht, wenn dies aus baulichen und/oder rechtlichen Gründen nicht möglich oder nicht zulässig ist"
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
      defaultMessage: "Aufwändige Decken- oder Wandverkleidung (z.B. Stuck, Täfelung) in gutem Zustand in der überwiegenden Anzahl der Wohnräume"
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

export const AntiBurglary = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Apartment.AntiBurglary",
      defaultMessage: "Verstärkte und zusätzlich vor Einbruch gesicherte Wohnungstür"
    },
    explanation: {
      id: "Apartment.AntiBurglaryExplanation",
      defaultMessage: "Zusätzlich gesichert zum Beispiel über hochwertige Sperrbügel und/oder Türschlösser mit Mehrfachverriegelung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="AntiBurglary"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
    <CardText className="cardText">
      <p><FormattedMessage {...messages.explanation} /></p>
    </CardText>
  </Card>;
});
