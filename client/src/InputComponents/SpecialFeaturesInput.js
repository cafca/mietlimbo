// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';

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

const featureMessages = defineMessages({
  "true": {
    id: "Generic.True",
    defaultMessage: "Ja"
  },
  "false": {
    id: "Generic.False",
    defaultMessage: "Nein"
  },
  "FloorTitle": {
    id: "SpecialFeatures.FloorTitle",
    defaultMessage: "Hochwertiger Bodenbelag"
  },
  "Floor": {
    id: "SpecialFeatures.Floor",
    defaultMessage: "Gibt es in mindestens der Hälfte der Wohnräume hochwertiges Parkett, Natur oder Kunststeinboden, Fliesen oder gleichwertigen Bodenbelag?"
  },
  "KitchenTitle": {
    id: "SpecialFeatures.KitchenTitle",
    defaultMessage: "Wurde vom Vermieter eine moderne Küchenausstattung gestellt?"
  },
  "Kitchen": {
    id: "SpecialFeatures.Kitchen",
    defaultMessage: "Dies beinhaltet mindestens: Küchenschränke, Einbauspüle, Dunstabzugshaube, Herd mit Ceran- oder Induktionskochfeld, Backofen, Wandfliesen im Arbeitsbereich und einen Kühlschrank."
  },
  "ShowerTitle": {
    id: "SpecialFeatures.ShowerTitle",
    defaultMessage: "Gibt es eine Badewanne und eine davon getrennte Dusche?"
  },
  "Shower": {
    id: "SpecialFeatures.Shower",
    defaultMessage: ""
  },
  "SmallBathTitle": {
    id: "SpecialFeatures.SmallBathTitle",
    defaultMessage: "Ist das Bad sehr klein?"
  },
  "SmallBath": {
    id: "SpecialFeatures.SmallBath",
    defaultMessage: "Dies ist der Fall, wenn es weniger als 4 Quadratmeter groß ist."
  },
  "ModernBathTitle": {
    id: "SpecialFeatures.ModernBathTitle",
    defaultMessage: "Befindet sich in der Wohnung ein modernes Bad? "
  },
  "ModernBath": {
    id: "SpecialFeatures.ModernBath",
    defaultMessage: "Dazu gehört: Wände ausreichend im Spritzwasserbereich von Waschbecken, Badewanne und/oder Dusche gefliest, Bodenfliesen, Einbauwanne und/oder Dusche, Einhebelmischbatterie und Strukturheizkörper als Handtuchwärmer."
  },
  "WindowsTitle": {
    id: "SpecialFeatures.WindowsTitle",
    defaultMessage: "Hochwertige Fenster"
  },
  "Windows": {
    id: "SpecialFeatures.Windows",
    defaultMessage: "Sind mindestens die Hälfte der Fenster mit Isolierverglasung (ab 1987 eingebaut) oder Schallschutzfenstern ausgestattet?"
  },
  "LiftTitle": {
    id: "SpecialFeatures.LiftTitle",
    defaultMessage: "Gibt es einen Aufzug im Haus?"
  },
  "Lift": {
    id: "SpecialFeatures.Lift",
    defaultMessage: ""
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

const EastWest = injectIntl((props) => {
  const messages = defineMessages({
    title: {
      id: "SpecialFeatures.eastWestTitle",
      defaultMessage: "Wohnung in der ehemaligen DDR"
    },
    label: {
      id: "SpecialFeatures.eastWest",
      defaultMessage: "Die Wohnung liegt im Gebiet der ehemaligen DDR"
    },
    yes: {
      id: "SpecialFeatures.eastWestTrue",
      defaultMessage: "Ja"
    },
    no: {
      id: "SpecialFeatures.eastWestFalse",
      defaultMessage: "Nein"
    }
  });

  return <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(messages.title)} />
    <CardText>
      <Toggle
        label={props.intl.formatMessage(messages.label)}
        labelPosition={"right"}
        onToggle={(e, toggled) => props.change(toggled)} /> 
    </CardText>
  </Card>;
});

const SpecialFeatureOption = injectIntl((props) =>
  <Card className="assistantInput">
    <CardTitle title={props.intl.formatMessage(featureMessages[(props.featName + "Title")])} />
    <CardText>
      <p>
        <FormattedMessage {...featureMessages[props.featName]} />
      </p>
    </CardText>
    <CardActions>
      <RadioButtonGroup 
        name={props.featName} 
        onChange={(e, value) => {
          props.change(props.featName, value);
        }} >
        <RadioButton
          id={props.featName + "True"}
          label={props.intl.formatMessage(featureMessages["true"])}
          value={true} 
          style={{display: "inline-block", width: ""}} />
        <RadioButton
          id={props.featName + "False"}
          label={props.intl.formatMessage(featureMessages["false"])}
          value={false} 
          style={{display: "inline-block", width: "", marginLeft: "1em"}} />
      </RadioButtonGroup>
    </CardActions>
  </Card>);

export default SpecialFeaturesInput;
