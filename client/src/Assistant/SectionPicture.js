// @flow

import React from 'react';

import Coins from '../Graphics/Coins.png';
import Contract from '../Graphics/Contract.png';
import Legal from '../Graphics/Legal.png';
import Bath from '../Graphics/Bath.png';
import Kitchen from '../Graphics/Kitchen.png';
import Apartment from '../Graphics/Apartment.png';
import Building from '../Graphics/Building.png';
import Energy from '../Graphics/Energy.png';
import Environment from '../Graphics/Environment.png';
import Zack from '../Graphics/Zack.png';
import Logo from '../Graphics/Logo.png';

const SectionPicture = (props: {name: string}) => {
  const style = {
    width: 170,
    marginBottom: 20
  };

  let src = null;
  switch (props.name) {
    case "Start":
      src = Contract;
      break;
    case "Eckdaten":
      src = Legal;
      break;
    case "Mietspiegelabfrage":
      src = Coins;
      break;
    case "Bad":
      src = Bath;
      break;
    case "Küche":
      src = Kitchen;
      break;
    case "Wohnung":
      src = Apartment;
      break;
    case "Gebäude":
      src = Building;
      break;
    case "Energie":
      src = Energy;
      break;
    case "Umfeld":
      src = Environment;
      break;
    case "Ergebnis":
      src = Zack;
      break;
    default:
      src = Logo;
  }
  // alt prop left empty as this image is decorative
  return <img src={src} style={style} alt="" />;
}

export default SectionPicture;