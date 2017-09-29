// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import logoOkf from "../Graphics/logo-okfn.svg";
import logoBmbf from "../Graphics/logo-bmbf.svg";
import {grey500, blue500} from 'material-ui/styles/colors';

import ml1 from "../Graphics/ml1.png";
import ml2 from "../Graphics/ml2.png";
import ml3 from "../Graphics/ml3.png";
import ml3a from "../Graphics/ml3a.png";
import ml4 from "../Graphics/ml4.png";
import ml5 from "../Graphics/ml5.png";
import ml6 from "../Graphics/ml6.png";

const style = {
  container: {
    marginTop: 50
  },
  img: {
    width: "100%"
  },
  impressum: {
    color: grey500,
    textDecoration: "none",
    fontSize: 14
  },
  link: {
    color: blue500,
    textDecoration: "none",
  }
};

const Preview = () => <div style={style.container}>
  <h1>Ein Assistent für eine einfachere Mietpreisbremse</h1>
  <p>Es sollte einfacher sein, mit der Mietpreisbremse auf eigene Faust eine Mietsenkung 
  zu erwirken und dadurch das <em>mietlimbo</em> zu verhindern, bei welchem die Mieten jedes Mal weiter steigen, 
  wenn eine Wohnung weitergegeben wurde, ohne, dass gegen zu hohe Mieten angefochten
  wurde.</p>

  <p>Hierbei hilft der mietlimbo-Assistent, indem er alle Sonderfälle überprüft und für eine 
  bestimmte Wohnung den kritischen Wert <em>ortsübliche Vergleichsmiete + 10 Prozent</em> berechnet, 
  auf den die Miete gesenkt werden kann.</p>

  <p>Obwohl die Software bereits fertig entwickelt ist, kann ich mietlimbo im Moment noch nicht veröffentlichen, da das Rechtsdienstleistungsgesetz
  dies nur zulässt, wenn ich vorher alle Inhalte von einem Anwalt habe prüfen lassen. Daher suche
  ich im Moment nach einem Kooperationspartner, der mir hiermit hilft. Hast du eine Idee, wer das sein könnte? 
  Dann schreibe mir gerne an <a href="mailto:hallo@mietlimbo.de" style={style.link}>hallo@mietlimbo.de</a></p>

  <p>Wenn du (einmalig) von mir hören möchtest, sobald mietlimbo offiziell startet, melde dich hier einfach mit deiner Email-Adresse an:</p>

  <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"></link>
  <div id="mc_embed_signup" style={{clear:"left", font:"14px Helvetica,Arial,sans-serif", width:"100%"}}>
  <form action="//github.us3.list-manage.com/subscribe/post?u=ccc89b05626e50b935568e6ec&amp;id=090381b944" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
      <div id="mc_embed_signup_scroll">
    
    <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="Email-Adresse" required></input>
      <div style={{position: "absolute", left: -5000}} aria-hidden="true"><input type="text" name="b_ccc89b05626e50b935568e6ec_090381b944" tabIndex="-1" value=""></input></div>
      <div className="clear"><input type="submit" value="Anmelden" name="subscribe" id="mc-embedded-subscribe" className="button"></input></div>
      </div>
  </form>
  </div>

  <h2>Das kann mietlimbo</h2>

  <ul style={style.list}>
    <li>Mietspiegelabfrage über eine moderne, schnelle und nutzerfreundlich gestaltete Webseite</li>
    <li>Überprüfung aller wichtigen Ausnahmeregelungen für die Mietpreisbremse</li>
    <li>Einordnung im Mietspiegelfeld über Abfrage der Merkmale in den fünf Kategorien Bad, Küche, Wohnung, Gebäude und Umfeld</li>
    <li>Berechnung der maximal zulässigen Miete unter Berücksichtigung aller Angaben</li>
    <li>Speicherung aller Eingaben, so dass bei Rückkehr zur Seite nicht alles erneut eingegeben werden muss</li>
    <li>Ergebnisübersicht zum Ausdrucken, die zu einer Rechtsberatung bei Mieterverein oder Anwalt mitgenommen werden kann</li>
    <li>Englische Übersetzung aller Inhalte und Abfragen (weitere Übersetzungen können hinzugefügt werden)</li>
  </ul>

  <h2>Und so sieht's aus</h2>

  <img alt="Screenshot-1" style={style.img}  src={ml1} />
  <img alt="Screenshot-2" style={style.img}  src={ml2} />
  <img alt="Screenshot-3" style={style.img}  src={ml3} />
  <img alt="Screenshot-4" style={style.img}  src={ml3a} />
  <img alt="Screenshot-5" style={style.img}  src={ml4} />
  <img alt="Screenshot-6" style={style.img}  src={ml5} />
  <img alt="Screenshot-7" style={style.img}  src={ml6} />

  <p>Realisiert wurde dieses Projekt von Vincent Ahrend mit Förderung und Unterstützung von <a style={style.link} href="https://prototypefund.de/">Prototype Fund</a>, dem <a style={style.link} href="http://www.dlr.de/pt/">
  Deutschen Zentrum für Luft- und Raumfahrttechnik Projektträger</a> und <a style={style.link} href="https://www.bmbf.de/">
  Bundesministerium für Bildung und Forschung</a>.</p>
  <p style={{margin: "4em 0"}}>
    <img alt="Gefördert vom BMBF" src={logoBmbf} style={{marginRight: "2em"}}/>
    <img alt="Gefört von Open Knowledge Foundation Germany" src={logoOkf} />
  </p>
  <NavLink to="/about/" style={style.impressum} >Impressum</NavLink>
</div>;

export default Preview;