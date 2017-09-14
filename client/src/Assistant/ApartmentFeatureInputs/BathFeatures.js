// @flow

import React from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { CardText, CardActions } from 'material-ui/Card';

import CheckboxInput from './CheckboxInput';
import type { RangeInputProps } from './RangeSelectionGroup';
import FeatureInput from './FeatureInput';

import './Styles.css';

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

  return <FeatureInput title={props.intl.formatMessage(messages.title)}>
    <CardText className="cardText">
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
  </FeatureInput>;
});

export const ToiletNoVentilation = injectIntl((props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  const messages = defineMessages({
    title: {
      id: "Bath.ToiletNoVentilation",
      defaultMessage: "Das WC hat keine Lüftungsmöglichkeit oder Entlüftung."
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="ToiletNoVentilation"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const BoardFlooring = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.BoardFlooring",
      defaultMessage: "Es gibt Dielenfußboden im Bad." 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="BoardFlooring"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const NoHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoHeating",
      defaultMessage: "Gibt es in Bad oder WC keine normale Heizung?"
    }
  });

  return <FeatureInput title={props.intl.formatMessage(messages.title)}>
    <CardText className="cardText">
      <ul>
        <li><FormattedMessage 
          id="Bath.NoHeating1" 
          defaultMessage="Garnicht beheizbar" 
        /></li>
        <li><FormattedMessage 
          id="Bath.NoHeating2" 
          defaultMessage="Nur Holz- oder Kohleheizung" 
        /></li>
        <li><FormattedMessage 
          id="Bath.NoHeating3" 
          defaultMessage="Nur Elektroheizstrahler" 
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
  </FeatureInput>;
});

export const WarmWater = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.WarmWater" ,
      defaultMessage: "Keine ausreichende Warmwasserversorgung." 
    }
  });

  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="WarmWater"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText className="cardText">
      <p>
        <FormattedMessage 
          id="Bath.WarmWaterExamples" 
          defaultMessage="Zum Beispiel: keine zentrale Warmwasserversorgung, kein Durchlauferhitzer, kein Boiler > 60 Liter" 
        />
      </p>
    </CardText>
  </FeatureInput>;
});

export const FixedBathtub = injectIntl((props: RangeInputProps) => {
  // Bad ohne separate Dusche mit frei stehender Badewanne mit oder ohne Verblendung in nicht modernisiertem Bad
  const messages = defineMessages({
    title: {
      id: "Bath.FixedBathtub",
      defaultMessage: "Es gibt weder eine fest eingebaute Badewanne noch eine separate Dusche. Das Bad ist nicht modernisiert." 
    }
  })
  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="FixedBathtub"
        positive={false}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText className="cardText">
      <p>
        <FormattedMessage 
          id="Bath.FixedBathtubExplanation" 
          defaultMessage="Auch eine Badewanne mit Verblendung gilt nicht als fest eingebaut."
        />
      </p>
    </CardText>
  </FeatureInput>;
});

export const InsufficientTiling = injectIntl((props: RangeInputProps) => {
  // Wände nicht ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest.
  const messages = defineMessages({
    title: {
      id: "Bath.InsufficientTiling" ,
      defaultMessage: "Die Wände sind im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche nicht ausreichend gefliest." 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="InsufficientTiling"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const NoWindows = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoWindows" ,
      defaultMessage: "Bad mit WC ohne Fenster"
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="NoWindows"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const NoShower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.NoShower" ,
      defaultMessage: "Keine Duschmöglichkeit" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="NoShower"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const TinyBath = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.TinyBath" ,
      defaultMessage: "Es gibt nur ein sehr kleines Bad (kleiner als 4 m²)." 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="TinyBath"
      positive={false}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
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
  return <FeatureInput title={props.intl.formatMessage(messages.title)} >
    <CardText className="cardText">
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
  </FeatureInput>;
});

export const HighClassFeatures = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.HighClassFeatures" ,
      defaultMessage: "Besondere und hochwertige Ausstattung" 
    }
  })
  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="HighClassFeatures"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText className="cardText">
      <p>
        <FormattedMessage 
          id="Bath.HighClassFeaturesExamples" 
          defaultMessage="Zum Beispiel hochwertige Sanitärausstattung, hochwertige Badmöbel, Eckwanne, Rundwanne" 
        />
      </p>
    </CardText>
  </FeatureInput>;
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
  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="ElectronicVentilation"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
      />} >
    <CardText className="cardText">
      <p>
       <FormattedMessage {...messages.description} />
    </p>
    </CardText>
  </FeatureInput>;
});

export const AdditionalWC = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.AdditionalWC" ,
      defaultMessage: "Zweites WC in der Wohnung oder Bad und WC getrennt" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="AdditionalWC"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const LargeBath = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.LargeBath" ,
      defaultMessage: "Mindestens ein Bad ist größer als 8 m²." 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="LargeBath"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const FloorHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.FloorHeating" ,
      defaultMessage: "Fußbodenheizung" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="FloorHeating"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const HighClassTiling = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.HighClassTiling" ,
      defaultMessage: "Wandbekleidung und Bodenbelag hochwertig" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="HighClassTiling"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const WallMountedWC = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.WallMountedWC" ,
      defaultMessage: "Wandhängendes WC mit in der Wand eingelassenem Spülkasten" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="WallMountedWC"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const TowelHeating = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.TowelHeating" ,
      defaultMessage: "Strukturheizkörper als Handtuchwärmer" 
    }
  })
  return <FeatureInput title={<CheckboxInput
      changed={props.changed}
      name="TowelHeating"
      positive={true}
      message={props.intl.formatMessage(messages.title)}
      value={props.value}
    />} 
  />;
});

export const AdditionalShower = injectIntl((props: RangeInputProps) => {
  const messages = defineMessages({
    title: {
      id: "Bath.AdditionalShower" ,
      defaultMessage: "Von der Badewanne getrennte zusätzliche Duschtasse oder -kabine" 
    }
  })
  return <FeatureInput title={<CheckboxInput
        changed={props.changed}
        name="AdditionalShower"
        positive={true}
        message={props.intl.formatMessage(messages.title)}
        value={props.value}
    />} 
  />;
});

