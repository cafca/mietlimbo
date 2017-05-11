// @flow

import React from 'react';
import autoBind from 'react-autobind';
import {FormattedMessage} from 'react-intl';
import Autocomplete from 'react-google-autocomplete';

import {AssistantInputProps, ErrorList} from './Tools';

class AddressInput extends React.Component {
  state: {
    value: string,
    place: any,
    errors: Array<any>
  }

  inputName: string = "address";

  constructor(props: AssistantInputProps) {
    super(props);
    autoBind(this);
    this.state = {
      value: "",
      place: undefined,
      errors: []
    }
  }

  placeInBerlin(place: any) {
    const berlinCriterium = val => (
      val.types[0] === "administrative_area_level_1" 
      && val.long_name === "Berlin");
    return place.address_components.reduce(
      (prev, cur) => (berlinCriterium(cur) ? true : prev), false)
  }

  placeHasHouseNumber(place: any) {
    const numberCriterium = val => val.types[0] === "street_number";
    return place.address_components.reduce(
      (prev, cur) => (numberCriterium(cur) ? true : prev), false)
  }

  handleChange(place: any) {
    const value = place.formatted_address;
    const errors = [];

    if(!this.placeInBerlin(place)) {
      errors.push(<FormattedMessage 
        id='BasicData.errorNotBerlin' 
        defaultMessage="Bitte wähle einen Ort in Berlin" />)
    } else if(!this.placeHasHouseNumber(place)) {
      errors.push(<FormattedMessage 
        id='BasicData.errorNoNumber' 
        defaultMessage="Bitte gib eine Hausnummer ein." />)
    } else {
      this.props.changed(this.inputName, value);
      this.props.changed("addressPlace", place);
    }
    this.setState({value, place, errors});
  }

  render() {
    return <div className="assistantInput">
      <p><label htmlFor={this.inputName}>
        <FormattedMessage 
          id="AddressInput.label" 
          defaultMessage="Wie lautet deine Adresse?" />
      </label></p>
      <Autocomplete
        id={this.inputName}
        onPlaceSelected={this.handleChange}
        className="textInput"
        types={['address']}
        componentRestrictions={{country: "de"}} />
      <ErrorList errors={this.state.errors} />
      <MapEmbed place={this.state.place} />
    </div>;
  }
}

type MapEmbedProps = {
  place: {place_id: string}
};

const MapEmbed = (props: MapEmbedProps) => {
  if (props.place !== undefined) {
    const apiKey = "AIzaSyDKLCOzvFpy3sr4Gc3YGHttdVB5wSnu78M";
    const srcUrl = "https://www.google.com/maps/embed/v1/place?key=" 
      + apiKey + "&q=place_id:" + props.place.place_id;
    return <div className="mapEmbed">
      <iframe
        width="95%"
        height="300"
        frameBorder="0" style={{border: 0}}
        src={srcUrl}>
      </iframe>
      </div>;
  } else {
    return <span className="mapEmbed"></span>;
  }
}

export default AddressInput;