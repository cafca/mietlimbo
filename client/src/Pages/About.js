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
  <h2>Impressum</h2>
  <p>Angaben gemäß § 5 TMG</p>
  <img alt="Impressum" style={style.img}  src="http://blog.vincentahrend.com//content/images/2016/11/Untitled2222.png" />
  <p><strong>Oben genannter Herausgeber ebenfalls verantwortlich für den Inhalt nach § 55 Abs. 2 RStV.</strong></p>

  <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE310404812</p>


  <h3>Haftungsausschluss: </h3>
  <p><strong>Haftung für Inhalte</strong></p>
  <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
  <h3>Haftung für Links</h3>
  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
  <h3>Datenschutz</h3>
  Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br />
  Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br />
  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br />
  <h3>Google Analytics</h3>
  <p>Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google''). Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.</p>
  <p><em>Website Impressum von <a href="http://www.impressum-generator.de">impressum-generator.de</a></em></p>
</div>;

export default Landing;