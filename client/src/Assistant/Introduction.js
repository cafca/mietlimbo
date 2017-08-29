// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';

import {red500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import AutoSave from "./GenericInputs/AutoSave";

const styles = {
  bigtext: {
    fontSize: 28
  },
  warning: {
    color: red500
  },
  text: {
    fontSize: 18
  },
  titleWrapper: {
    padding: "1em",
    marginBottom: 5
  }
};

export const Introduction = (props) => {
  return <section>
    <p style={styles.warning}>
      <FormattedMessage
        id="Introduction.warning"
        defaultMessage="Achtung! Mietlimbo wird gerade noch gestestet und ist noch nicht fehlerfrei. 
          Die Informationen auf dieser Seite solltest du nicht direkt für bare Münze nehmen." />
    </p>
    <p style={styles.text}>
      <FormattedMessage
        id="Introduction.requirements"
        defaultMessage={`Um möglichst schnell und einfach zum Ergebnis zu kommen
          helfen einige Dinge enorm:`}
      />
    </p>
    <ul className="inline-list" style={styles.text}>
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
          id="Introduction.requirement3"
          defaultMessage={`Kaltmiete des Vormieters`}
        />
      </li>
      <li>
        <FormattedMessage
          id="Introduction.requirement4"
          defaultMessage={`Die Wohnung selbst! Bei manchen Fragen muss man
            einfach mal eben nachgucken.`}
        />
      </li>
    </ul>
    <p style={styles.text}>
      <FormattedMessage
        id="Introduction.requirementsUnavailable"
        defaultMessage={`Wenn nicht alles zur Hand ist, dann ist das auch nicht schlimm, du kannst auch 
          erstmal schätzen und die Antwort des Vermieters abwarten. Wenn der 
          anderer Meinung ist, kannst du immernoch genauer nachforschen.`}
        />
    </p>
    <p style={styles.text}><FormattedMessage
      id="Introduction.nextSteps"
      defaultMessage={`Am Ende dieses Assistenten hast du die wichtigsten 
        Informationen für eine Mietpreisbremse zusammen. Hiermit kannst du ein
        Schreiben an deinen Vermieter senden (die sogenannte 'qualifizierte
        Mietrüge'), mit dem du ihn aufforderst, deine Miete zu senken.`}
    /></p>
    <p style={styles.text}><FormattedMessage
      id="Introduction.legalNote"
      defaultMessage={`Wenn du 
        noch unsicher bist und eine Rechtsberatung zu deiner individuellen 
        Situation möchtest, kannst du mit dem Ergebnis auch einfach zu einem 
        Mieterbund gehen, wo dir beim weiteren Vorgehen geholfen wird. Beachte 
        bitte, dass Mietlimbo keine Rechtsberatung ist und eine Rechtsberatung 
        auch nicht ersetzen kann. Ich stelle dir hier kostenfrei nach meinen Möglichkeiten 
        korrekte und vollständige Informationen über die Mietpreisbremse zur Verfügung. 
        Ich übernehme allerdings keine Gewähr für die Richtigkeit, Vollständigkeit 
        und Aktualität der Informationen.`}
    /></p>
    <AutoSave {...props} />
  </section>;
}

export const Title = () => <Paper zDepth={4} style={styles.titleWrapper}><p style={styles.bigtext}><FormattedMessage
  id="Introduction.overview"
  defaultMessage={`Mit mietlimbo findest du in 30 Minuten heraus, 
    wieviel Geld du monatlich mit der Mietpreisbremse sparen kannst und was genau 
    der erste Schritt ist, um dahin zu kommen.`}
/></p></Paper>;
