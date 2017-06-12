// @flow

import React from 'react';
import {FormattedMessage} from 'react-intl';
import CheckboxInput from './CheckboxInput';

type RangeInputProps = {
  changed: (string, string) => any
};

// 
// Negative Features
// 

export const TinySink = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>Was für ein Handwaschbecken gibt es?</p>
    <ul>
      <li><FormattedMessage 
        id="Bath.NoSink1" 
        defaultMessage="Es gibt kein Handwaschbecken." 
      /></li>
      <li><FormattedMessage 
        id="Bath.NoSink2" 
        defaultMessage="Es gibt nur ein kleines Handwaschbecken (Außenmaß 50 x 25 cm oder kleiner)." 
      /></li>
    </ul>
    <CheckboxInput
      changed={props.changed}
      name="tinySink"
      positive={false}
      message="atLeastOne"
    />
  </div>;
}

export const ToiletNoVentilation = (props: RangeInputProps) => {
  // WC ohne Lüftungsmöglichkeit oder Entlüftung
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="toiletNoVentilation"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.ToiletNoVentilation" 
        defaultMessage="Das WC hat keine Lüftungsmöglichkeit oder Entlüftung." 
      />
    </p>
    
  </div>;
}

export const BoardFlooring = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="boardFlooring"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.BoardFlooring" 
        defaultMessage="Es gibt Dielenfußboden im Bad." 
      />
    </p>
  </div>;
}

export const NoHeating = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p><FormattedMessage
      id="Bath.NoHeatingIntro"
      defaultMessage="Heizung im Bad:"
    /></p>
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
    <CheckboxInput
      changed={props.changed}
      name="noHeating"
      positive={false}
      message="atLeastOne"
    />
  </div>;
}

export const WarmWater = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="warmWater"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.WarmWater" 
        defaultMessage="Keine ausreichende Warmwasserversorgung." 
      />
    </p>
    <p><em>
      <FormattedMessage 
        id="Bath.WarmWaterExamples" 
        defaultMessage="(z.B. keine zentrale Warmwasserversorgung, kein Durchlauferhitzer, kein Boiler > 60 Liter)" 
      />
    </em></p>

  </div>;
}

export const FixedBathtub = (props: RangeInputProps) => {
  // Bad ohne separate Dusche mit frei stehender Badewanne mit oder ohne Verblendung in nicht modernisiertem Bad
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="fixedBathtub"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.FixedBathtub" 
        defaultMessage="Es gibt weder eine fest eingebaute Badewanne noch eine separate Dusche. Das Bad ist nicht modernisiert." 
      />
    </p>
  </div>;
}

export const InsufficientTiling = (props: RangeInputProps) => {
  // Wände nicht ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest.
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="insufficientTiling"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.InsufficientTiling" 
        defaultMessage="Die Wände sind im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche nicht ausreichend gefliest." 
      />
    </p>
  </div>;
}

export const NoWindows = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="noWindows"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.NoWindows" 
        defaultMessage="Bad mit WC ohne Fenster" 
      />
    </p>
  </div>;
}

export const NoShower = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="noShower"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.NoShower" 
        defaultMessage="Keine Duschmöglichkeit" 
      />
    </p>
  </div>;
}

export const TinyBath = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="tinyBath"
        positive={false}
      />
      <FormattedMessage 
        id="Bath.TinyBath" 
        defaultMessage="Es gibt nur ein sehr kleines Bad (kleiner als 4 m²)." 
      />
    </p>
  </div>;
}

// 
// Positive Features
// 

export const LargeSink = (props: RangeInputProps) => {
  return <div className="assistantInput">
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
    <CheckboxInput
      changed={props.changed}
      name="largeSink"
      positive={true}
      message="atLeastOne"
    />
  </div>;
}

export const HighClassFeatures = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="highClassFeatures"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.HighClassFeatures" 
        defaultMessage="Besondere und hochwertige Ausstattung" 
      />
    </p>
    <p><em>
      <FormattedMessage 
        id="Bath.HighClassFeaturesExamples" 
        defaultMessage="(z.B. hochwertige Sanitärausstattung, hochwertige Badmöbel, Eckwanne, Rundwanne)" 
      />
    </em></p>
    
  </div>;
}

export const ElectronicVentilation = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="electronicVentilation"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.ElectronicVentilation" 
        defaultMessage="Innen liegendes Badezimmer mit moderner, gesteuerter Entlüftung (z.B. mittels Feuchtigkeitssensor)." 
      />
    </p>
  </div>;
}

export const AdditionalWC = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="additionalWC"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.AdditionalWC" 
        defaultMessage="Zweites WC in der Wohnung oder Bad und WC getrennt" 
      />
    </p>
  </div>;
}

export const LargeBath = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="largeBath"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.LargeBath" 
        defaultMessage="Mindestens ein Bad ist größer als 8 m²." 
      />
    </p>
  </div>;
}

export const FloorHeating = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="floorHeating"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.FloorHeating" 
        defaultMessage="Fußbodenheizung" 
      />
    </p>
  </div>;
}

export const HighClassTiling = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="highClassTiling"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.HighClassTiling" 
        defaultMessage="Wandbekleidung und Bodenbelag hochwertig" 
      />
    </p>
  </div>;
}

export const WallMountedWC = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="wallMountedWC"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.WallMountedWC" 
        defaultMessage="Wandhängendes WC mit in der Wand eingelassenem Spülkasten" 
      />
    </p>
  </div>;
}

export const TowelHeating = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="towelHeating"
        positive={true}
      />
      <FormattedMessage 
        id="Bath.TowelHeating" 
        defaultMessage="Strukturheizkörper als Handtuchwärmer" 
      />
    </p>
  </div>;
}

export const AdditionalShower = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <CheckboxInput
        changed={props.changed}
        name="additionalShower"
        positive={true}
      /> 
      <FormattedMessage 
        id="Bath.AdditionalShower" 
        defaultMessage="Von der Badewanne getrennte zusätzliche Duschtasse oder -kabine" 
      />
    </p>
  </div>;
}

