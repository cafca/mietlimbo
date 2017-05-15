// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages } from 'react-intl';

import type {AssistantInputProps} from './Tools';
import {constructionDateRange} from './Tools';

const specialFeatureValuation = {
  "Floor": {
    "pre1918": 0.56,
    "pre1949": 0.83,
    "pre1964": 1.10,
    "pre1990": 0.46, // only for west germany
    "pre2002": 0.79 
  },
  "Kitchen": {
    "pre1918": 1.37,
    "pre1964": 1.04,
    "pre1972": 0.50,
    "pre1990": 0.40, // only for west germany
    "pre2002": 0.42
  },
  "Shower": {
    "pre1918": 0.63
  },
  "SmallBath": {
    "pre2002": -0.32
  },
  "ModernBath": {
    "pre1918": 0.34,
    "pre1949": 0.40,
    "pre1964": 0.28,
    "pre1972": 0.12,
    "pre1990": 0.16, // only for east germany
  },
  "Windows": {
    "pre1918": 0.28
  },
  "Lift": {
    "pre1918": 0.64
  }
}

const featureDescriptions = defineMessages({
  "true": {
    id: "Generic.True",
    defaultMessage: "Yes"
  },
  "false": {
    id: "Generic.False",
    defaultMessage: "No"
  },
  "Floor": {
    id: "SpecialFeatures.Floor",
    defaultMessage: "Gibt es in mindestens der Hälfte der Wohnräume hochwertiges Parkett, Natur oder Kunststeinboden, Fliesen oder gleichwertigen Bodenbelag?"
  },
  "Kitchen": {
    id: "SpecialFeatures.Kitchen",
    defaultMessage: "Wurde vom Vermieter eine moderne Küchenausstattung gestellt? Dies beinhaltet mindestens: Küchenschränke, Einbauspüle, Dunstabzugshaube, Herd mit Ceran- oder Induktionskochfeld, Backofen, Wandfliesen im Arbeitsbereich und einen Kühlschrank."
  },
  "Shower": {
    id: "SpecialFeatures.Shower",
    defaultMessage: "Gibt es eine Badewanne und eine davon getrennte Dusche?"
  },
  "SmallBath": {
    id: "SpecialFeatures.SmallBath",
    defaultMessage: "Ist das Bad kleiner als 4qm?"
  },
  "ModernBath": {
    id: "SpecialFeatures.ModernBath",
    defaultMessage: "Befindet sich in der Wohnung ein modernes Bad? Dazu gehört: Wände ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest, Bodenfliesen, Einbauwanne und/oder Dusche, Einhebelmischbatterie und Strukturheizkörper als Handtuchwärmer."
  },
  "Windows": {
    id: "SpecialFeatures.Windows",
    defaultMessage: "Sind mindestens die Hälfte der Fenster mit Isolierverglasung (ab 1987 eingebaut) oder Schallschutzfenstern ausgestattet?"
  },
  "Lift": {
    id: "SpecialFeatures.Lift",
    defaultMessage: "Gibt es einen Aufzug im Haus?"
  }
})

class SpecialFeaturesInput extends React.Component {
  state: {
    data: Object,
    eastWest: ?boolean
  }

  inputName: string = "specialFeatures";

  // If user has set an exact construction date, assign a date range for that
  constructionDateRange = this.props.constructionDateGuessed != undefined ? 
        this.props.constructionDateGuessed : constructionDateRange(this.props.constructionDate)

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);

    this.state = {
      data: {},
      eastWest: undefined
    }
  }

  componentDidMount() {
    this.valid();
  }

  valid() {
    // component is valid when no required feature is undefined in 
    // this.state.data.

    // This method should always be called after setState
    
    const isValid = this.listFeatures().reduce((acc, cur) => {
      return this.state.data[cur] === undefined ? false : acc;
    }, true);
    this.props.valid(this.inputName, isValid);
  }

  handleChange(feat: string, val: any) {
    const data = Object.assign({}, this.state.data, {[feat]: val});
    this.setState({data}, this.valid);

    // Pass list of selected features upstream
    const featureList = Object.keys(data).reduce(
      (acc, cur) => data[cur] === true ? acc.concat(cur) : acc, []);
    this.props.changed({[this.inputName]: featureList});
  }

  handleEastWest(checked: boolean) {
    this.props.changed({"eastWest": checked});
    this.setState({"eastWest": checked}, this.valid);
  }

  listFeatures() {
    // Certain features are unavailable if location
    // is in former GDR or not
    const featureUnavailable = (feat: string) => {
      return (this.state.eastWest === true && feat === "Floor") 
        || (this.state.eastWest === true && feat === "Kitchen")
        || (this.state.eastWest === false && feat === "ModernBath");
    };

    return Object.keys(specialFeatureValuation)
      .reduce((acc: Array<string>, cur: string) => {
        return (specialFeatureValuation[cur][this.constructionDateRange] === undefined || featureUnavailable(cur))
          ? acc : acc.concat(cur);
      }, []);
  }

  render() {
    var selectors = [];

    if (this.constructionDateRange === "pre1990") {
      selectors.push(<EastWest 
        key="eastWest" 
        change={this.handleEastWest} 
        value={this.state.eastWest} />);
    }

    selectors = selectors.concat(this.listFeatures().map(feat => {
      return <SpecialFeatureOption 
        featName={feat} 
        change={this.handleChange} 
        value={this.state.data[feat] === undefined 
          ? undefined : this.state.data[feat] === true}
        key={feat} />;
      })
    );

    return <div>
      {selectors}
    </div>;
  }
}

const EastWest = (props) => <div className="assistantInput">
  <p>
    <label htmlFor="eastWest">
      <FormattedMessage 
        id="SpecialFeatures.eastWest"
        defaultMessage="Liegt die Wohnung im Gebiet der ehemaligen DDR?" />
    </label>

    <div>
      <input
      id="eastWestTrue"
      name="eastWest"
      type="radio"
      value="eastWestTrue"
      checked={props.value === true}
      onChange={e => {props.change(e.target.checked === true);}} /> 
      <FormattedMessage
        id="SpecialFeatures.eastWestTrue" 
        defaultMessage="Ja" />
    </div>

    <div>
      <input
        id="eastWestFalse"
        name="eastWest"
        type="radio"
        value="eastWestFalse"
        checked={props.value === false}
        onChange={e => {props.change(e.target.checked === false);}} /> 
      <FormattedMessage
        id="SpecialFeatures.eastWestFalse"
        defaultMessage="Nein" />
    </div>
  </p>
</div>;

const SpecialFeatureOption = (props) =>
  <div className="assistantInput">
    <p>
      <label htmlFor={props.featName}>
        <FormattedMessage
          {...featureDescriptions[props.featName]} />
      </label>

      <div>
        <input
          id={props.featName + "True"}
          name={props.featName}
          type="radio"
          value={props.featName + "True"}
          checked={props.value === true}
          onChange={e => {
            props.change(props.featName, e.target.checked === true);
          }} /> 
        <FormattedMessage
          {...featureDescriptions["true"]} />
      </div>

      <div>
        <input
          id={props.featName + "False"}
          name={props.featName}
          type="radio"
          value={props.featName + "False"}
          checked={props.value === false}
          onChange={e => {
            props.change(props.featName, e.target.checked === false);
          }} /> 
        <FormattedMessage
          {...featureDescriptions["false"]} />
      </div>
    </p>
  </div>;

export default SpecialFeaturesInput;
