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
    <p>Was für ein Handwaschbecken gibt es in der Wohnung?</p>
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
      message="atLeastOne"
    />
  </div>;
}

export const ToiletNoVentilation = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.ToiletNoVentilation" 
        defaultMessage="WC ohne Lüftungsmöglichkeit oder Entlüftung." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="toiletNoVentilation"
    />
  </div>;
}

export const BoardFlooring = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.BoardFlooring" 
        defaultMessage="Dielenfußboden im Bad." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="boardFlooring"
    />
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
      message="atLeastOne"
    />
  </div>;
}

export const WarmWater = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
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
    <CheckboxInput
      changed={props.changed}
      name="warmWater"
    />
  </div>;
}

export const FixedBathtub = (props: RangeInputProps) => {
  // Bad ohne separate Dusche mit frei stehender Badewanne mit oder ohne Verblendung in nicht modernisiertem Bad
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.FixedBathtub" 
        defaultMessage="Es gibt weder eine fest eingebaute Badewanne noch eine separate Dusche. Das Bad ist nicht modernisiert." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="fixedBathtub"
    />
  </div>;
}

export const InsufficientTiling = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.InsufficientTiling" 
        defaultMessage="Wände nicht ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="insufficientTiling"
    />
  </div>;
}

export const NoWindows = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.NoWindows" 
        defaultMessage="Bad mit WC ohne Fenster" 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="noWindows"
    />
  </div>;
}

export const NoShower = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.NoShower" 
        defaultMessage="Keine Duschmöglichkeit" 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="noShower"
    />
  </div>;
}

export const TinyBath = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.TinyBath" 
        defaultMessage="Es gibt nur ein sehr kleines Bad (kleiner als 4 m²)." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="tinyBath"
    />
  </div>;
}

// 
// Positive Features
// 

export const LargeBath = (props: RangeInputProps) => {
  return <div className="assistantInput">
    <p>
      <FormattedMessage 
        id="Bath.LargeBath" 
        defaultMessage="Mindestens ein Bad ist größer als 8 m²." 
      />
    </p>
    <CheckboxInput
      changed={props.changed}
      name="largeBath"
    />
  </div>;
}

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
      message="atLeastOne"
    />
  </div>;
}

