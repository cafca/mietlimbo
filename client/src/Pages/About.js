// @flow

import React from 'react';
import { Link } from 'react-router-dom'

const style = {
  container: {
    marginTop: 100
  },
  img: {
    width: "100%"
  }
};

const Landing = () => <div style={style.container}>
  <p>Die Mietpreisbremse mag ein stumpfes Schwert sein, aber wer damit nicht kämpft hat auch verloren.</p>
  <p>Diese Seite will es 
  einfacher machen, mit der Mietpreisbremse auf eigene Faust eine Mietsenkung zu erwirken und dadurch das Mietlimbo verhindern,
  bei welchem die Mieten jedes Mal weiter steigen, wenn eine Wohnung weitergegeben wurde, ohne, dass gegen zu hohe Mieten angefochten
  wurde.</p>
  <p>Hierbei hilft der mietlimbo-Assistent, indem er alle Sonderfälle überprüft und für eine bestimmte Wohnung den kritischen
  Wert <em>ortsübliche Vergleichsmiete + 10 Prozent</em> berechnet, auf den die Miete gesenkt werden kann.</p>
  <p><Link to="/app/">Jetzt loslegen</Link></p>
  <p>Realisiert wurde dieses Projekt von Vincent Ahrend mit Förderung und Unterstützung vom <a href="https://prototypefund.de/">Prototype Fund</a>,
  dem <a href="http://www.dlr.de/pt/">Deutschen Zentrum für Luft- und Raumfahrttechnik Projektträger</a> und <a href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a>.</p>
  <p>
    <a href="Vincent Ahrend">
      <img style={style.img} src="http://blog.vincentahrend.com/content/images/2016/11/Untitled2222.png" />
    </a>
  </p>
</div>;

export default Landing;