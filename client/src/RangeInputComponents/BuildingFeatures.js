// @flow

import React from 'react';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';

type RangeInputProps = {
  changed: (string, string) => any,
  intl: intlShape 
};

export const EntranceCondition = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.EntranceCondition",
      defaultMessage: "Das Treppenhaus bzw. der Eingangsbereich sind überwiegend in schlechtem Zustand."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="EntranceCondition"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const DoorLock = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.DoorLock",
      defaultMessage: "Die Hauseingangstür ist nicht abschließbar."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="DoorLock"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const RepresentativeEntrance = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.RepresentativeEntrance",
      defaultMessage: "Es gibt einen repräsentativen oder hochwertig sanierten Eingangsbereich, bzw. ein solches Treppenhaus. (z.B. Spiegel, Marmor, exklusive Beleuchtung, hochwertiger Anstrich/Wandbelag, Läufer im gesamten Flur- und Treppenbereich)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="RepresentativeEntrance"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const WellMaintained = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.WellMaintained",
      defaultMessage: "Das Gebäude, bzw. der Teil davon, in dem sich die Wohnung befindet, ist in einem überdurchschnittlichen Instandhaltungszustand (z.B. erneuerte Fassade, Dach)."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="WellMaintained"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const NoStorageRoom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoStorageRoom",
      defaultMessage: "Es gibt keinen nur dem Mieter zugänglichen, bestimmungsgemäß nutzbaren Abstellraum im Gebäude, der außerhalb der Wohnung liegt."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoStorageRoom"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const BicycleRoom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.BicycleRoom",
      defaultMessage: "Es gibt einen abschließbaren Fahrradabstellraum."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BicycleRoom"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const BicycleParking = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.BicycleParking",
      defaultMessage: "Es gibt gar keine Fahrradabstellmöglichkeit."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BicycleParking"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const CommunalSpace = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.CommunalSpace",
      defaultMessage: "Es gibt zusätzliche und in angemessenem Umfang nutzbare Räume außerhalb der Wohnung in fußläufiger Entfernung (z.B. Partyraum)"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="CommunalSpace"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const Parking = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.Parking",
      defaultMessage: "Es gibt eine zur Wohnung gehörige Garage oder einen Stellplatz und hierfür fällt auch kein zusätzliches Entgelt an."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="Parking"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const LowMaintenance = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.LowMaintenance",
      defaultMessage: "Das Gebäude ist in einem schlechten Instandhaltungszustand (z.B. dauernde Durchfeuchtung des Mauerwerks - auch Keller -, große Putzschäden, erhebliche Schäden an der Dacheindeckung)."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="LowMaintenance"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const SideWing = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.SideWing",
      defaultMessage: "Lage im Seitenflügel oder Quergebäude bei verdichteter Bebauung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="SideWing"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const NoLift = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoLift",
      defaultMessage: "Die Wohnung liegt im oder über dem fünften Obergeschoss und es gibt keinen Personenaufzug."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoLift"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const Lift = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.Lift",
      defaultMessage: "Es gibt einen Personenaufzug bei weniger als fünf Obergeschossen."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="Lift"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const NoIntercom = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.NoIntercom",
      defaultMessage: "Es gibt keine Gegen-/Wechselsprechanlage mit elektrischem Türöffner."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoIntercom"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const IntercomVideo = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.IntercomVideo",
      defaultMessage: "Die Gegen-/Wechselsprechanlage bietet Videoübertragung und einen elektrischen Türöffner."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="IntercomVideo"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});

export const AntiBurglary = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Building.AntiBurglary",
      defaultMessage: "Es gibt zusätzliche moderne Einbruchsicherungsmaßnahmen, also z.B. eine einbruchhemmende Wohnungs- und Haustür"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="AntiBurglary"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
      />} />
  </Card>;
});