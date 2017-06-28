// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Introduction = (props: {serialNumber: string}) => {
  return <section>
    <p><FormattedMessage
      id="Introduction.welcome"
      defaultMessage={`Hallo lieber Tester #{serialNumber}`}
      values={props}
    /></p>
    <p><FormattedMessage
      id="Introduction.overview"
      defaultMessage={`Schön, dass du heute hier bist. Ich werde dich nun einige Fragen über die Mietpreisbremse im Allgemeinen fragen und dann mit dir Fragen durchgehen, welche auch im Rahmen einer Mietspiegelabfrage gestellt werden, und damit prüfen wie verständlich diese Fragen für dich sind. `}
    /></p>
    <p><FormattedMessage
      id="Introduction.legalNote"
      defaultMessage={`Du kannst unser Gespräch jederzeit ohne Angabe von Gründen unterbrechen. Beachte bitte, dass dies keine Rechtsberatung ist und eine Rechtsberatung auch nicht ersetzen kann. Ich prüfe die Benutzerfreundlichkeit der Abfragen im Rahmen einer Mietspiegelabfrage und stelle dir im Rahmen dessen nach meinen Möglichkeiten korrekte und vollständige Informationen hierüber zur Verfügung. Ich übernehme allerdings keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Informationen. Zur Wahrnehmung der Mietpreisbremse empfehle ich dir, einen Anwalt bzw. Mieterverein aufzusuchen.
`}
    /></p>
    <p><FormattedMessage
      id="Introduction.timing"
      defaultMessage={`Das Gespräch wird ungefähr eine Stunde dauern und ich werde eine Video- und Audioaufzeichnung zur Unterstützung meiner Analyse vornehmen. 
`}
    /></p><span></span>
  </section>;
}

export default Introduction;

