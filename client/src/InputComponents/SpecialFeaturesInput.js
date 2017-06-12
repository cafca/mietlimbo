// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages } from 'react-intl';

import type {AssistantInputProps} from './Tools';
import {constructionDateRange} from './Tools';

const specialFeatureValuation = {
  "Floor": {
    "Pre1918": 0.56,
    "Pre1949": 0.83,
    "Pre1964": 1.10,
    "Pre1990": 0.46, // only for west germany
    "Pre2002": 0.79 
  },
  "Kitchen": {
    "Pre1918": 1.37,
    "Pre1964": 1.04,
    "Pre1972": 0.50,
    "Pre1990": 0.40, // only for west germany
    "Pre2002": 0.42
  },
  "Shower": {
    "Pre1918": 0.63
  },
  "SmallBath": {
    "Pre2002": -0.32
  },
  "ModernBath": {
    "Pre1918": 0.34,
    "Pre1949": 0.40,
    "Pre1964": 0.28,
    "Pre1972": 0.12,
    "Pre1990": 0.16, // only for east germany
  },
  "Windows": {
    "Pre1918": 0.28
  },
  "Lift": {
    "Pre1918": 0.64
  }
}

const titleText = defineMessages({
  "Pre1918": {
    "id": "SpecialFeatures.TitlePre1918",
    "defaultMessage": "Sondermerkmale für die Baujahre bis 1918"
  },
  "Pre1949": {
    "id": "SpecialFeatures.TitlePre1949",
    "defaultMessage": "Sondermerkmale für die Baujahre 1919 bis 1949"
  },
  "Pre1964": {
    "id": "SpecialFeatures.TitlePre1964",
    "defaultMessage": "Sondermerkmale für die Baujahre 1959 bis 1964"
  },
  "Pre1972": {
    "id": "SpecialFeatures.TitlePre1972",
    "defaultMessage": "Sondermerkmale für die Baujahre 1965 bis 1972"
  },
  "Pre1990": {
    "id": "SpecialFeatures.TitlePre1990",
    "defaultMessage": "Sondermerkmale für die Baujahre 1973 bis 1990"
  },
  "Pre2002": {
    "id": "SpecialFeatures.TitlePre2002",
    "defaultMessage": "Sondermerkmale für die Baujahre 1991 bis 2002"
  },
  "Pre2013": {
    "id": "SpecialFeatures.TitlePre2013",
    "defaultMessage": "Sondermerkmale für die Baujahre 2003 bis 2013"
  },
  "newBuilding": {
    "id": "SpecialFeatures.TitleNewBuilding",
    "defaultMessage": "Sondermerkmale für Neubauten"
  }
});

const featureDescriptions = defineMessages({
  "true": {
    id: "Generic.True",
    defaultMessage: "Ja"
  },
  "false": {
    id: "Generic.False",
    defaultMessage: "Nein"
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

  // Linter complains about '!=', but it is necessary to compare against both
  // null and undefined as possible values
  // eslint-disable-next-line
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

    if (this.constructionDateRange === "Pre1990" && this.state.eastWest === undefined)
      this.props.valid(this.inputName, false)
    else
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
    this.props.changed({[this.inputName]: []});
    this.setState({
      "eastWest": checked,
      "data": {}
    }, this.valid);
  }

  listFeatures() {
    // Certain features are unavailable if location
    // is in former GDR or not
    const featureUnavailable = (feat: string) => {
      return (this.state.eastWest === true && feat === "Floor") 
        || (this.state.eastWest === true && feat === "Kitchen")
        || (this.state.eastWest === false && feat === "ModernBath");
    };
    const cdr = this.constructionDateRange;
    return Object.keys(specialFeatureValuation)
      .reduce((acc: Array<string>, cur: string) => {
        return (specialFeatureValuation[cur][cdr] === undefined || featureUnavailable(cur))
          ? acc : acc.concat(cur);
      }, []);
  }

  render() {
    var selectors = [];

    if (this.constructionDateRange === "Pre1990") {
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

    if(selectors.length === 0) selectors = <FormattedMessage
      id="SpecialFeatures.NoSelectors"
      defaultMessage="Für andere Baujahre können Sondermerkmale, wie zum Beispiel ein modernes Bad 
      oder ein Personenlift, das Mietlevel pauschal erhöhen oder verringern. Für das von Ihnen 
      angegebene Baujahr gilt diese Regelung nicht."
    />;

    return <div>
      <h1><FormattedMessage {...titleText[this.constructionDateRange]} /></h1>
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
