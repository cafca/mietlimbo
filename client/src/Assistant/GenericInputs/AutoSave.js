// @flow

import React from 'react'
import autoBind from 'react-autobind'
import { FormattedMessage } from 'react-intl'

import { pinkA200 } from 'material-ui/styles/colors'
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

export type AutoSaveProps = {
  autoSave: boolean, 
  changed: Function, 
  valid: Function ,
  initializeData: Function
};

class AutoSave extends React.Component {
  inputName = 'autoSave';
  state: Object;

  constructor(props: AutoSaveProps) {
    super(props)
    autoBind(this)
  }

  handleChange(ev: SyntheticInputEvent, value: boolean) {
    this.props.changed({[this.inputName]: value})
    this.props.valid(this.inputName, true)
  }

  resetEverything() {
    localStorage.clear() 
    this.props.changed({[this.inputName]: null}, () => {
      this.props.valid(this.inputName, false)
    })
  }

  isLocalStorageAvailable() {
    try {
      localStorage.setItem('test', 'test')
      localStorage.removeItem('test')
      return true
    } catch(e) {
      return false
    }
  }

  render() {
    return <Card className="assistantInput" id={this.inputName}>
      <CardTitle title={
        <FormattedMessage 
          id="Introduction.savingOptionTitle" 
          defaultMessage="Automatisch speichern?" 
        />} />
      <CardText>
        <p><FormattedMessage
          id="Introduction.savingOption"
          defaultMessage={`Möchtest du, dass alle deine Eingaben in diesem Browser gespeichert
            werden, so dass nichts verloren geht, wenn du das Fenster schließt? Deine persönlichen
            Daten werden so oder so nicht auf unserem Server gespeichert.`} /></p>
      </CardText>
      <CardText>
        <RadioButtonGroup onChange={this.handleChange} valueSelected={this.props.autoSave} name="autoSave">
          <RadioButton value={true} label={<FormattedMessage 
            id="Introduction.savingOptionTrue"
            defaultMessage="Ja, bitte speichern." />} 
          disabled={this.isLocalStorageAvailable() === false} />
          <RadioButton value={false} label={<FormattedMessage 
            id="Introduction.savingOptionFalse"
            defaultMessage="Nein, ich lebe gerne gefährlich." />} />
        </RadioButtonGroup>
        {this.isLocalStorageAvailable() ? null : <p style={{color: pinkA200}}><FormattedMessage
          id="Introduction.savingOptionUnavailable"
          defaultMessage="Leider unterstützt ihr Web-Browser keine Datenspeicherung."
        /></p>}
      </CardText>

      { this.props.autoSave === true &&
        <CardText>
          <RaisedButton 
            icon={<DeleteIcon />}
            label={<FormattedMessage 
              id="Introduction.savingOptionClear"
              defaultMessage="Gespeicherte Daten wieder löschen" />}
            onClick={this.resetEverything} />
        </CardText> 
      }

      { this.props.autoSave === null &&
        <CardText>
          <RaisedButton 
            icon={<DeleteIcon />}
            label={<FormattedMessage 
              id="Introduction.savingOptionClearConfirmation"
              defaultMessage="Seite neu laden zum endgültig löschen" />}
            secondary={true}
            onClick={() => {
              // eslint-disable-next-line
              location.reload();
            }} />
        </CardText> 
      }

    </Card>
  }
}

export default AutoSave