// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Introduction.css';

const Introduction = (props: {serialNumber: string}) => {
  return <section>
    <p><FormattedMessage
      id="Introduction.welcome"
      defaultMessage={`Hey Mieter!`}
      values={props}
    /></p>
    <p><FormattedMessage
      id="Introduction.overview"
      defaultMessage={`Hier findest du in den nächsten 30 Minuten heraus, 
        wieviel Geld du mit der Mietpreisbremse sparen kannst und was genau 
        der erste Schritt ist, um damit zu beginnen. Mit etwas Mut und Geduld kannst du nicht nur einen Haufen Geld 
        sparen, sondern auch deinen Kiez davor schützen, bei explosiven 
        Mietsteigerungen sein Gesicht zu verlieren.`}
    /></p>
    <p>
      <FormattedMessage
        id="Introduction.requirements"
        defaultMessage={`Um möglichst schnell und einfach zum Ergebnis zu kommen,
          helfen einige Dinge enorm:`}
      />
      <ul className="inline-list">
        <li>
          <FormattedMessage
            id="Introduction.requirement1"
            defaultMessage={`Mietvertrag`}
          />
        </li>
        <li>
          <FormattedMessage
            id="Introduction.requirement2"
            defaultMessage={`Heizkostenabrechnung`}
          />
        </li>
        <li>
          <FormattedMessage
            id="Introduction.requirement2"
            defaultMessage={`Mietzins des Vormieters`}
          />
        </li>
        <li>
          <FormattedMessage
            id="Introduction.requirement2"
            defaultMessage={`Der Wohnung selbst! Bei manchen Fragen muss man
              einfach mal eben nachgucken.`}
          />
        </li>
      </ul>
      <FormattedMessage
        id="Introduction.requirementsUnavailable"
        defaultMessage={`Wenn nicht alles zur Hand ist, dann ist das auch nicht schlimm, du kannst auch 
          erstmal schätzen und die Antwort des Vermieters abwarten. Wenn der 
          anderer Meinung ist, kannst du immernoch genauer nachforschen.`}
        />
    </p>
    <p><FormattedMessage
      id="Introduction.nextSteps"
      defaultMessage={`Am Ende dieses Assistenten hast du die wichtigsten 
        Informationen für eine Mietpreisbremse zusammen. Hiermit kannst du ein
        Schreiben an deinen Vermieter senden (die sogenannte 'qualifizierte
        Mietrüge'), mit dem du ihn aufforderst, deine Miete zu senken. 
`}
    /></p>
    <p><FormattedMessage
      id="Introduction.legalNote"
      defaultMessage={`Wenn du 
        noch unsicher bist und eine Rechtsberatung zu deiner individuellen 
        Situation möchtest, kannst du mit dem Ergebnis auch einfach zu einem 
        Mieterbund gehen, wo dir beim weiteren Vorgehen geholfen wird. Beachte 
        bitte, dass Mietlimbo keine Rechtsberatung ist und eine Rechtsberatung 
        auch nicht ersetzen kann. Ich stelle dir hier nach meinen Möglichkeiten 
        korrekte und vollständige Informationen über die Mietpreisbremse zur Verfügung. 
        Ich übernehme allerdings keine Gewähr für die Richtigkeit, Vollständigkeit 
        und Aktualität der Informationen. 
`}
    /></p>
  </section>;
}

export default Introduction;

