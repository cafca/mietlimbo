// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';

import type {AssistantInputProps} from './Tools';

type Address = {
  id: string,
  streetname: string,
  range: string
};

type AddressProps = AssistantInputProps & {
  value: ?Address
};

class AddressInput extends React.Component {
  state: {
    query: string,
    address: ?Address
  }

  inputName: string = "address";

  constructor(props: AddressProps) {
    super(props);
    autoBind(this);
    this.state = {
      query: "",
      address: props.value
    }
    if (props.value !== undefined) this.props.valid(this.inputName, true);
  }

  handleChange(ev: SyntheticInputEvent, value: string) {
    this.setState({query: value});
  }

  handleSelection(value: ?Address) {  
    // Linter complains about '!=', but it is necessary to compare against both
    // null and undefined as possible values
    // eslint-disable-next-line
    if (value != undefined) {
      this.setState({
        address: value
      });
      this.props.valid(this.inputName, true);
      this.props.changed({address: value});
    } else {
      this.setState({query: "", address: null});
      this.props.valid(this.inputName, false);
      this.props.changed({address: null});
    }
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "AddressInput.title",
        defaultMessage: "Wo wohnst du?"
      }
    });

    // Linter complains about '!=', but it is necessary to compare against both
    // null and undefined as possible values
    // eslint-disable-next-line
    const inputField = this.state.address == undefined ?  <TextField 
          id="addressInput"
          value={this.state.query} 
          onChange={this.handleChange} /> : undefined;

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        {inputField}
        <MietspiegelPlace 
          query={this.state.query} 
          handleSelection={this.handleSelection} 
          value={this.state.address} />
      </CardText>
    </Card>;
  }
}

type MietspiegelPlaceProps = {
  query: string,
  value: ?Address
};

class MietspiegelPlace extends React.Component {
  inputName: "addressInput"

  state: {
    query: string,
    state: string,
    places: Array<{name: string, ranges: Array<{name: string, id: string}>}>,
    selected: ?Address
  }

  states = {
    WAITING: "Waiting for query prop",
    REQUESTED: "Waiting for API response",
    SELECTING: "Waiting for user selection",
    FINISHED: "Finished",
    ERROR: "Error retrieving results."
  }

  constructor(props: MietspiegelPlaceProps) {
    super(props);
    this.state = {
      query: props.query,
      state: props.value === undefined ? this.states.WAITING : this.states.FINISHED,
      places: [],
      selected: props.value
    };
    autoBind(this);
  }

  componentWillReceiveProps(nextProps: MietspiegelPlaceProps) {
    if(nextProps.query !== this.props.query) {
      this.setState({
        query: nextProps.query,
        state: nextProps.query.length < 4 ? this.states.WAITING : this.states.REQUESTED
      });
      if (nextProps.query.length >= 4) this.handleQuery(nextProps.query);
    }
  }

  handleQuery(query: string) {
    return fetch("http://localhost:8000/api/v1/street?name=" + encodeURIComponent(query))
      .then((resp) => {console.log(resp); return resp.json()})
      .then((respJson) => {
        this.setState({
          places: respJson.data,
          errors: respJson.errors,
          state: this.states.SELECTING
        });
      })
      .catch(error => {
        console.error("Error handling address query.", error);
        this.setState({state: this.states.ERROR});
      })
  }

  handleSelection(ev: SyntheticInputEvent, value: Address) {
    this.setState({state: this.states.FINISHED, selected: value});
    this.props.handleSelection(value);
  }

  handleReset(ev: SyntheticInputEvent) {
    this.setState({state: this.states.WAITING, selected: null});
    this.props.handleSelection(null);
  }

  render() {
    let menuItems = "";
    switch (this.state.state) {
      case this.states.REQUESTED:
        menuItems = <span className="MietspiegelPlace">
            <FormattedMessage 
              id={"AddressInput.placesLoading"} 
              defaultMessage={"Lade Straßennamen..."} />
          </span>;
        break;

      case this.states.SELECTING:
        menuItems = this.state.places.map(placeData => {
          const subMenu = placeData.ranges.map(rangeData => 
            <MenuItem 
              primaryText={rangeData.name} 
              key={rangeData.id} 
              onTouchTap={ev => {this.handleSelection(ev, 
                {id: rangeData.id, streetname: placeData.name, range: rangeData.name})}}
              value={{id: rangeData.id, street: placeData.name, range: rangeData.name}} />
          );

          if (subMenu.length > 1) {
            return <MenuItem 
              primaryText={placeData.name} 
              key={placeData.name} 
              rightIcon={<ArrowDropRight />} 
              menuItems={subMenu} />;
          } else {
            return <MenuItem
              primaryText={placeData.name} 
              key={placeData.name} 
              onTouchTap={ev => {this.handleSelection(ev, 
                {id: placeData.ranges[0].id, streetname: placeData.name, range: placeData.ranges[0].name})}} />;
          }
        });
        break;

      case this.states.FINISHED:
        menuItems = <MenuItem
          key={"FINISHED-" + this.state.selected.streetname}
          leftIcon={<ClearIcon />}
          primaryText={this.state.selected.streetname}
          secondaryText={this.state.selected.range}
          onTouchTap={this.handleReset}
          />;
        break;

      case this.states.ERROR:
        menuItems = <MenuItem
          children={<FormattedMessage 
            id={"AddressInput.errorMessage"}
            defaultMessage={"Es gab leider einen Fehler beim Laden der Adressen. Bitte klicke hier um es nochmal zu versuchen."} />}
          leftIcon={<ErrorIcon />}
          onTouchTap={ev => this.handleQuery(this.state.query)}
          />;
        break;
      default:
        menuItems = "";
    }
    return <Menu 
      disableAutoFocus={true} 
      desktop={true} 
      style={{width: "99%"}}
      value={this.state.selected}>
        {menuItems}
    </Menu>;
  }
}

export default injectIntl(AddressInput);