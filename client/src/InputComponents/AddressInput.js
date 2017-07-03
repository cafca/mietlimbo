// @flow

import React from 'react';
import autoBind from 'react-autobind';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import TextField from 'material-ui/TextField';

import type {AssistantInputProps} from './Tools';

class AddressInput extends React.Component {
  state: {
    query: string,
    streetname: ?string,
    houseNumber: ?string,
    placeID: ?string
  }

  inputName: string = "address";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      query: "",
      streetname: null,
      houseNumber: null,
      placeID: null
    }
  }

  handleChange(ev: SyntheticInputEvent, value: string) {
    this.setState({query: value});
  }

  handleSelection(value: ?{id: string, street: string, range: string}) {
    if (value != undefined) {
      this.setState({
        streetname: value.street,
        houseNumber: value.range,
        placeID: value.id
      });
      this.props.valid(this.inputName, true);
      this.props.changed({placeID: value.id, street: value.street, houseNumber: value.range});
    } else {
      this.setState({query: "", placeID: null});
      this.props.valid(this.inputName, false);
      this.props.changed({placeID: null, street: null, houseNumber: null});
    }
  }

  render() {
    const messages = defineMessages({
      title: {
        id: "AddressInput.title",
        defaultMessage: "Wie lautet deine Adresse?"
      }
    });

    return <Card className="assistantInput">
      <CardTitle title={this.props.intl.formatMessage(messages.title)} />
      <CardText>
        <TextField 
          id={"addressInput"} 
          value={this.state.query} 
          onChange={this.handleChange} 
          disabled={this.state.placeID !== null} />
        <MietspiegelPlace query={this.state.query} handleSelection={this.handleSelection} />
      </CardText>
    </Card>;
  }
}

type MietspiegelPlaceProps = {
  query: string,
  selected: {id: string, street: string, range: string}
};

class MietspiegelPlace extends React.Component {
  inputName: "addressInput"

  state: {
    query: string,
    state: string,
    places: Array<{name: string, ranges: Array<{name: string, id: string}>}>,
    selected: {id: string, street: string, range: string}
  }

  states = {
    WAITING: "Waiting for query prop",
    REQUESTED: "Waiting for API response",
    SELECTING: "Waiting for user selection",
    FINISHED: "Finished"
  }

  constructor(props: MietspiegelPlaceProps) {
    super(props);
    this.state = {
      query: props.query,
      state: this.states.WAITING,
      places: [],
      errors: null,
      selected: props.selected
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
  }

  handleSelection(ev: SyntheticInputEvent, value: {id: string, street: string, range: string}) {
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
              defaultMessage={"Lade Straßennamen"} />
          </span>;
          break;

      case this.states.SELECTING:
        menuItems = this.state.places.map(placeData => {
          const subMenu = placeData.ranges.map(rangeData => 
            <MenuItem 
              primaryText={rangeData.name} 
              key={rangeData.id} 
              onTouchTap={ev => {this.handleSelection(ev, {id: rangeData.id, street: placeData.name, range: rangeData.name})}}
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
              value={{id: placeData.ranges[0].id, street: placeData.name, range: placeData.ranges[0].name}} />;
          }
        })
        break;

      case this.states.FINISHED:
        menuItems = <MenuItem
          checked={true}
          primaryText={this.state.selected.street}
          secondaryText={this.state.selected.range}
          onTouchTap={this.handleReset}
          />;
        break;

      default:
        menuItems = "";
    }
    return <Menu 
      disableAutoFocus={true} 
      desktop={true} 
      style={{width: "60%"}}
      value={this.state.selected}
      onChange={this.handleSelection} >
        {menuItems}
    </Menu>;
  }
}

export default injectIntl(AddressInput);