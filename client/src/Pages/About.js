// @flow

import React from 'react'
import Impressum from '../Graphics/Impressum.png'
import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import logoOkf from '../Graphics/logo-okfn.svg'
import logoBmbf from '../Graphics/logo-bmbf.svg'

const style = {
  container: {
    marginTop: 100
  },
  img: {
    width: '100%'
  }
}

const Landing = () => (
  <div style={style.container}>
    <RaisedButton
      primary={true}
      label={
        <FormattedMessage
          id="Landing.backButton"
          defaultMessage="< Zurück zur Startseite"
        />
      }
      containerElement={<NavLink to="/preview/" />}
    />
    <p>
      Diese Seite will es einfacher machen, mit der Mietpreisbremse auf eigene
      Faust eine Mietsenkung zu erwirken und dadurch das Mietlimbo verhindern,
      bei welchem die Mieten jedes Mal weiter steigen, wenn eine Wohnung
      weitergegeben wurde, ohne, dass gegen zu hohe Mieten angefochten wurde.
    </p>
    <p>
      Hierbei hilft der mietlimbo-Assistent, indem er alle Sonderfälle überprüft
      und für eine bestimmte Wohnung den kritischen Wert{' '}
      <em>ortsübliche Vergleichsmiete + 10 Prozent</em> berechnet, auf den die
      Miete gesenkt werden kann.
    </p>
    <p>
      Realisiert wurde dieses Projekt von Vincent Ahrend mit Förderung und
      Unterstützung vom <a href="https://prototypefund.de/">Prototype Fund</a>,
      dem{' '}
      <a href="http://www.dlr.de/pt/">
        Deutschen Zentrum für Luft- und Raumfahrttechnik Projektträger
      </a>{' '}
      und{' '}
      <a href="https://www.bmbf.de/">
        Bundesministerium für Bildung und Forschung
      </a>
      .
    </p>
    <p style={{ margin: '4em 0' }}>
      <img
        alt="Gefördert vom BMBF"
        src={logoBmbf}
        style={{ marginRight: '2em' }}
      />
      <img alt="Gefört von Open Knowledge Foundation Germany" src={logoOkf} />
    </p>
    <p>Ländericons für Sprachumstellung von:</p>
    <p>Germany free icon - Icon made by Freepik from www.flaticon.com </p>
    <p>
      United Kingdom free icon - Icon made by Freepik from www.flaticon.com{' '}
    </p>
    <h2>Impressum</h2>
    <p>Angaben gemäß § 5 TMG</p>
    <img alt="Impressum" style={style.img} src={Impressum} />
    <p>
      <strong>
        Oben genannter Herausgeber ebenfalls verantwortlich für den Inhalt nach
        § 55 Abs. 2 RStV.
      </strong>
    </p>
    <p>
      Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
      DE310404812
    </p>
    <h3>Haftungsausschluss: </h3>
    <p>
      <strong>Haftung für Inhalte</strong>
    </p>
    <p>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
      Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
      keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
      für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
      verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
      nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
      überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
      Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
      Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
      unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
      der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
      von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
      entfernen.
    </p>
    <h3>Haftung für Links</h3>
    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte
    wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
    keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
    jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
    Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
    überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
    erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
    jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
    Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
    entfernen.
    <h3>Datenschutz</h3>
    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener
    Daten möglich. Soweit auf unseren Seiten personenbezogene Daten
    (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt
    dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne
    Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br />
    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
    Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
    Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br />
    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
    Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
    angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
    widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich
    rechtliche Schritte im Falle der unverlangten Zusendung von
    Werbeinformationen, etwa durch Spam-Mails, vor.
    <br />
    <h4>Clicky</h4>
    <p>
      Diese Webseite nutzt den Webanalysedienst Clicky, um Statistiken darüber
      zu erheben, wie Nutzer dieses Webangebot verwenden. Dazu werden
      Besucherinformationen erhoben und an die Server der Roxr Software, Ltd.
      übermittelt. Mittels Clicky lässt sie die Benutzung der Website durch die
      Nutzer analysieren. Hierfür werden sog. ''Cookies'', Textdateien, die auf
      Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der
      Webseite durch Sie ermöglichen, an Roxr Software, Ltd. übermittelt. Zweck
      und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der
      Daten durch Clicky können Sie den Datenschutzhinweisen der Roxr Software,
      Ltd. unter clicky.com/help/faq/features/cookies#/terms entnehmen.
    </p>
    <h4>
      Ihre Rechte auf Auskunft, Berichtigung, Sperre, Löschung und Widerspruch
    </h4>
    <p>
      Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten
      personenbezogenen Daten zu erhalten. Ebenso haben Sie das Recht auf
      Berichtigung, Sperrung oder, abgesehen von der vorgeschriebenen
      Datenspeicherung zur Geschäftsabwicklung, Löschung Ihrer personenbezogenen
      Daten. Bitte wenden Sie sich dazu an unseren Datenschutzbeauftragten über
      die E-Mail-Adresse hallo@mietlimbo.de.
    </p>
    <p>
      Damit eine Sperre von Daten jederzeit berücksichtigt werden kann, müssen
      diese Daten zu Kontrollzwecken in einer Sperrdatei vorgehalten werden. Sie
      können auch die Löschung der Daten verlangen, soweit keine gesetzliche
      Archivierungsverpflichtung besteht. Soweit eine solche Verpflichtung
      besteht, sperren wir Ihre Daten auf Wunsch.
    </p>
    <p>
      Sie können Änderungen oder den Widerruf einer Einwilligung durch
      entsprechende Mitteilung an uns mit Wirkung für die Zukunft vornehmen.
    </p>
  </div>
)

export default Landing