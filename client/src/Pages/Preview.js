// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'
import logoOkf from '../Graphics/logo-okfn.svg'
import logoBmbf from '../Graphics/logo-bmbf.svg'
import { grey500, blue500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'

import ml1 from '../Graphics/ml1.png'
import ml2 from '../Graphics/ml2.png'
import ml3 from '../Graphics/ml3.png'
import ml3a from '../Graphics/ml3a.png'
import ml4 from '../Graphics/ml4.png'
import ml5 from '../Graphics/ml5.png'
import ml6 from '../Graphics/ml6.png'

const style = {
  img: {
    width: '100%'
  },
  impressum: {
    color: grey500,
    textDecoration: 'none',
    fontSize: 14
  },
  link: {
    color: blue500,
    textDecoration: 'none'
  }
}

const Preview = () => (
  <div style={style.container} className='preview'>
    <h1>Ein Assistent für eine einfachere Mietpreisbremse</h1>
    <p>
      Die Mietpreisbremse wäre viel effektiver, wenn jeder in
      5 Minuten herausfinden könnte, ob sie anwendbar ist und wie viel Miete man damit
      jeden Monat sparen kann. 
    </p>

    <p>Hierbei hilft der kostenlose Online-Assistent mietlimbo, indem er alle Sonderfälle überprüft
      und für eine bestimmte Wohnung den kritischen Wert{' '}
    <em>ortsübliche Vergleichsmiete + 10 Prozent</em> berechnet, auf den die
      Miete gesenkt werden kann.
    </p>

    <p>
      <strong>
        Obwohl ein Prototyp bereits fertig entwickelt ist, kann ich
        mietlimbo im Moment noch nicht veröffentlichen
      </strong>
      , da das Rechtsdienstleistungsgesetz dies unter Umständen nur zulässt, wenn ich vorher
      alle Inhalte mit einem Anwalt prüfe. Daher suche ich im Moment
      nach einem Kooperationspartner, der mir hierbei hilft. Hast du eine Idee,
      wer das sein könnte? Dann schreibe mir gerne an{' '}
      <a href="mailto:hallo@mietlimbo.de" style={style.link}>
        hallo@mietlimbo.de
      </a>{' '}
      oder{' '}
      <a href="https://twitter.com/ciex" style={style.link}>
        @ciex
      </a>
    </p>

    <div className='notification'>
      <p>
        Wenn du (einmalig) von mir hören möchtest, sobald mietlimbo offiziell
        startet, kannst du dich jetzt
        anzumelden:
      </p>

      <RaisedButton
        href="http://github.us3.list-manage.com/subscribe/post?u=ccc89b05626e50b935568e6ec&id=090381b944"
        target="_blank"
        label="Sag mir Bescheid"
        primary={true}
        icon={<EmailIcon />}
      />
    </div>

    <h2>Das kann mietlimbo:</h2>

    <ul>
      <li>
        Mietspiegelabfrage für Berlin über eine moderne, schnelle und nutzerfreundlich
        gestaltete Webseite
      </li>
      <li>
        Überprüfung aller wichtigen Ausnahmeregelungen für die Mietpreisbremse
      </li>
      <li>
        Einordnung im Mietspiegelfeld über Abfrage der Merkmale in den fünf
        Kategorien Bad, Küche, Wohnung, Gebäude und Umfeld
      </li>
      <li>
        Berechnung der maximal zulässigen Miete unter Berücksichtigung aller
        Angaben
      </li>
      <li>
        Lokale Speicherung aller Eingaben, so dass bei Rückkehr zur Seite nicht alles
        erneut eingegeben werden muss. Alles kann mit einem Klick gelöscht werden.
      </li>
      <li>
        Ergebnisübersicht zum Ausdrucken, die zu einer Rechtsberatung bei
        Mieterverein oder Anwalt mitgenommen werden kann
      </li>
      <li>
        Englische Übersetzung aller Inhalte und Abfragen (weitere Übersetzungen
        können hinzugefügt werden)
      </li>
    </ul>

    <h2>Und so sieht's aus</h2>

    <img alt="Screenshot-1" style={style.img} src={ml1} />
    <img alt="Screenshot-2" style={style.img} src={ml2} />
    <img alt="Screenshot-3" style={style.img} src={ml3} />
    <img alt="Screenshot-4" style={style.img} src={ml3a} />
    <img alt="Screenshot-5" style={style.img} src={ml4} />
    <img alt="Screenshot-6" style={style.img} src={ml5} />
    <img alt="Screenshot-7" style={style.img} src={ml6} />

    <p>
      Realisiert wurde dieses Projekt von Vincent Ahrend mit Förderung und
      Unterstützung von{' '}
      <a style={style.link} href="https://prototypefund.de/">
        Prototype Fund
      </a>
      , dem{' '}
      <a style={style.link} href="http://www.dlr.de/pt/">
        Deutschen Zentrum für Luft- und Raumfahrttechnik Projektträger
      </a>{' '}
      und{' '}
      <a style={style.link} href="https://www.bmbf.de/">
        Bundesministerium für Bildung und Forschung
      </a>
      .
    </p>
    
    <p>Kontakt: <a href="mailto:hallo@mietlimbo.de">hallo@mietlimbo.de</a></p>

    <p style={{ margin: '4em 0' }}>
      <img
        alt="Gefördert vom BMBF"
        src={logoBmbf}
        style={{ marginRight: '2em' }}
      />
      <img alt="Gefört von Open Knowledge Foundation Germany" src={logoOkf} />
    </p>
    <NavLink to="/about/" style={style.impressum}>
      Impressum
    </NavLink>
  </div>
)

export default Preview
