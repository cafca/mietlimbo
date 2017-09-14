// @flow

import React from 'react';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import { CardText } from 'material-ui/Card';

import FeatureInput from './FeatureInput';
import CheckboxInput from './CheckboxInput';
import type { RangeInputProps } from './RangeSelectionGroup';
import EnergyClass from './EnergyFeatures';

import './Styles.css';

export const EntranceCondition = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.EntranceCondition",
      defaultMessage: "Das Treppenhaus bzw. der Eingangsbereich sind überwiegend in schlechtem Zustand."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="EntranceCondition"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const DoorLock = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.DoorLock",
      defaultMessage: "Die Hauseingangstür ist nicht abschließbar."
    }
  });

  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="DoorLock"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const RepresentativeEntrance = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.RepresentativeEntrance",
      defaultMessage: "Eingansbereich oder Treppenhaus hochwertig saniert oder repräsentativ."
    },
    explanation: {
      id: "Building.RepresentativeEntranceExamples",
      defaultMessage: "z.B. Spiegel, Marmor, exklusive Beleuchtung, hochwertiger Anstrich/Wandbelag, Läufer im gesamten Flur- und Treppenbereich"
    }
  });

  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="RepresentativeEntrance"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText>
      <p>
        <FormattedMessage {...messages.explanation} />
      </p>
    </CardText>
  </FeatureInput>;
});

export const WellMaintained = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.WellMaintained",
      defaultMessage: "Das Gebäude, bzw. der Teil davon, in dem sich die Wohnung befindet, ist in einem überdurchschnittlichen Instandhaltungszustand (z.B. erneuerte Fassade, Dach)."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="WellMaintained"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const LowMaintenance = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.LowMaintenance",
      defaultMessage: "Schlechter Instandhaltungszustand "
    },
    explanation: {
      id: "Building.LowMaintenanceExamples",
      defaultMessage: "Z.B. dauernde Durchfeuchtung des Mauerwerks - auch Keller -, große Putzschäden, erhebliche Schäden an der Dacheindeckung."
    }
  });

  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="LowMaintenance"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText>
      <p>
        <FormattedMessage {...messages.explanation} />
      </p>
    </CardText>
  </FeatureInput>;
});

export const NoStorageRoom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoStorageRoom",
      defaultMessage: "Kein Mieterkeller oder Kellerersatzraum zur alleinigen Nutzung des Mieters vorhanden"
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="NoStorageRoom"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const BicycleRoom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.BicycleRoom",
      defaultMessage: "Fahrradabstellraum oder Fahrradabstellplätze"
    },
    explanation: {
      id: "Building.BicycleRoomExplanation",
      defaultMessage: `Ein solcher Raum muss innerhalb des Gebäudes, abschließbar und 
        leicht zugänglich sein. Fahrradabstellplätze müssen eine Anschließmöglichkeit 
        bieten und sich außerhalb des Gebäudes auf dem Grundstück befinden.`
    }
  });
  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="BicycleRoom"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText>
      <p>
        <FormattedMessage {...messages.explanation} />
      </p>
    </CardText>
  </FeatureInput>;
});

export const CommunalSpace = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.CommunalSpace",
      defaultMessage: "Es gibt zusätzliche und in angemessenem Umfang nutzbare Räume außerhalb der Wohnung in fußläufiger Entfernung (z.B. Partyraum)"
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="CommunalSpace"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const SideWing = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.SideWing",
      defaultMessage: "Lage im Seitenflügel oder Quergebäude bei verdichteter Bebauung."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="SideWing"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const NoLift = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoLift",
      defaultMessage: "Die Wohnung liegt im 5. Stock oder höher und es gibt keinen Personenaufzug."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="NoLift"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const Lift = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.Lift",
      defaultMessage: "Es gibt einen Personenaufzug bei weniger als fünf Obergeschossen."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="Lift"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const NoIntercom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoIntercom",
      defaultMessage: "Es gibt keine Gegen-/Wechselsprechanlage mit elektrischem Türöffner."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="NoIntercom"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const IntercomVideo = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.IntercomVideo",
      defaultMessage: "Die Gegen-/Wechselsprechanlage bietet Videoübertragung und elektrischem Türöffner."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="IntercomVideo"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const Energy = injectIntl(EnergyClass)