// @flow

import React from 'react';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type {RangeInputProps} from './RangeSelectionGroup';


// 
// Negative Features
// 

export const TinySink = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.TinySinkTitle",
      defaultMessage: "Was für ein Handwaschbecken gibt es?"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <ul>
        <li><FormattedMessage 
          id="Bath.TinySink1" 
          defaultMessage="Es gibt kein Handwaschbecken." 
        /></li>
        <li><FormattedMessage 
          id="Bath.TinySink2" 
          defaultMessage="Es gibt nur ein kleines Handwaschbecken (Außenmaß 50 x 25 cm oder kleiner)." 
        /></li>
      </ul>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="TinySink"
        positive={false}
        message="atLeastOne"
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const ToiletNoVentilation = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Bath.ToiletNoVentilation",
      defaultMessage: "Das WC hat keine Lüftungsmöglichkeit oder Entlüftung."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="ToiletNoVentilation"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const BoardFlooring = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.BoardFlooring",
      defaultMessage: "Es gibt Dielenfußboden im Bad." 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="BoardFlooring"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoHeating",
      defaultMessage: "Heizung im Bad"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <ul>
        <li><FormattedMessage 
          id="Bath.NoHeating1" 
          defaultMessage="Garnicht beheizbar" 
        /></li>
        <li><FormattedMessage 
          id="Bath.NoHeating2" 
          defaultMessage="Holz/Kohleheizung" 
        /></li>
        <li><FormattedMessage 
          id="Bath.NoHeating3" 
          defaultMessage="Elektroheizstrahler" 
        /></li>
      </ul>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="NoHeating"
        positive={false}
        message="atLeastOne"
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const WarmWater = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.WarmWater" ,
      defaultMessage: "Keine ausreichende Warmwasserversorgung." 
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <p>
        <FormattedMessage 
          id="Bath.WarmWaterExamples" 
          defaultMessage="Zum Beispiel: keine zentrale Warmwasserversorgung, kein Durchlauferhitzer, kein Boiler > 60 Liter)" 
        />
      </p>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="WarmWater"
        positive={false}
        message={"applies"}
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const FixedBathtub = injectIntl((props: RangeInputProps) => {
  // Bad ohne separate Dusche mit frei stehender Badewanne mit oder ohne Verblendung in nicht modernisiertem Bad
  const messages = defineMessages({
    title: {
      id: "Bath.FixedBathtub",
      defaultMessage: "Es gibt weder eine fest eingebaute Badewanne noch eine separate Dusche. Das Bad ist nicht modernisiert." 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="FixedBathtub"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const InsufficientTiling = injectIntl((props: RangeInputProps) => {
  // Wände nicht ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest.
  const messages = defineMessages({
    title: {
      id: "Bath.InsufficientTiling" ,
      defaultMessage: "Die Wände sind im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche nicht ausreichend gefliest." 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="InsufficientTiling"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoWindows = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoWindows" ,
      defaultMessage: "Bad mit WC ohne Fenster"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoWindows"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const NoShower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoShower" ,
      defaultMessage: "Keine Duschmöglichkeit" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="NoShower"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const TinyBath = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.TinyBath" ,
      defaultMessage: "Es gibt nur ein sehr kleines Bad (kleiner als 4 m²)." 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="TinyBath"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

// 
// Positive Features
// 

export const LargeSink = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.LargeSinkTitle",
      defaultMessage: "Waschbecken"
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <ul>
        <li><FormattedMessage 
          id="Bath.LargeSink1" 
          defaultMessage="Sehr großes Waschbecken (Außenmaß mindestens 80cm breit)" 
        /></li>
        <li><FormattedMessage 
          id="Bath.LargeSink2" 
          defaultMessage="Doppelhandwaschbecken" 
        /></li>
        <li><FormattedMessage 
          id="Bath.LargeSink3" 
          defaultMessage="Zwei getrennte Waschbecken" 
        /></li>
      </ul>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="LargeSink"
        positive={true}
        message="atLeastOne"
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const HighClassFeatures = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.HighClassFeatures" ,
      defaultMessage: "Besondere und hochwertige Ausstattung" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <p>
      <FormattedMessage 
        id="Bath.HighClassFeaturesExamples" 
        defaultMessage="Zum Beispiel hochwertige Sanitärausstattung, hochwertige Badmöbel, Eckwanne, Rundwanne" 
      />
    </p>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="HighClassFeatures"
        positive={true}
        message={"applies"}
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const ElectronicVentilation = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.ElectronicVentilation" ,
      defaultMessage: "Innen liegendes Badezimmer mit moderner, gesteuerter Entlüftung" 
    },
    description: {
      id: "Bath.ElectronicVentilationDescription",
      defaultMessage: "Gesteuert zum Beispiel über einen Feuchtigkeitssensor. Innen liegend bedeutet, dass das Bad keine Fenster nach außen hat.."
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <p>
       <FormattedMessage {...messages.description} />
    </p>
    </CardText>
    <CardActions>
      <CheckboxInput
        changed={props.changed}
        name="ElectronicVentilation"
        positive={true}
        message={"applies"}
        value={props.value}
      />
    </CardActions>
  </Card>;
});

export const AdditionalWC = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.AdditionalWC" ,
      defaultMessage: "Zweites WC in der Wohnung oder Bad und WC getrennt" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="AdditionalWC"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const LargeBath = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.LargeBath" ,
      defaultMessage: "Mindestens ein Bad ist größer als 8 m²." 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="LargeBath"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const FloorHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.FloorHeating" ,
      defaultMessage: "Fußbodenheizung" 
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

export const HighClassTiling = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.HighClassTiling" ,
      defaultMessage: "Wandbekleidung und Bodenbelag hochwertig" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="HighClassTiling"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const WallMountedWC = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.WallMountedWC" ,
      defaultMessage: "Wandhängendes WC mit in der Wand eingelassenem Spülkasten" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="WallMountedWC"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const TowelHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.TowelHeating" ,
      defaultMessage: "Strukturheizkörper als Handtuchwärmer" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="TowelHeating"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

export const AdditionalShower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.AdditionalShower" ,
      defaultMessage: "Von der Badewanne getrennte zusätzliche Duschtasse oder -kabine" 
    }
  })
  return <Card className="assistantInput">
    <CardTitle title={<CheckboxInput
        changed={props.changed}
        name="AdditionalShower"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} />
  </Card>;
});

