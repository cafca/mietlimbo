// @flow

import React from 'react'
import autoBind from 'react-autobind'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import TextField from 'material-ui/TextField'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import { blue500 } from 'material-ui/styles/colors'

import { serverURL } from '../Config'
import type { AssistantInputProps } from '../Types'

type Address = {
  id: string,
  streetname: string,
  range: string
}

type AddressProps = AssistantInputProps & {
  value: ?Address
}

class AddressInput extends React.Component {
  state: {
    query: string,
    address: ?Address
  }

  inputName: string = 'address'

  constructor(props: AddressProps) {
    super(props)
    autoBind(this)
    this.state = {
      query: '',
      address: props.value
    }
  }

  componentDidMount() {
    // eslint-disable-next-line eqeqeq
    if (this.props.value != undefined) this.props.valid(this.inputName, true)
  }

  handleChange(ev: SyntheticInputEvent, value: string) {
    this.setState({ query: value })
  }

  handleSelection(value: ?Address) {
    // Linter complains about '!=', but it is necessary to compare against both
    // null and undefined as possible values
    // eslint-disable-next-line
    if (value != undefined) {
      this.setState({
        address: value
      })
      this.props.valid(this.inputName, true)
      this.props.changed({ address: value })
    } else {
      this.setState({ query: '', address: null })
      this.props.valid(this.inputName, false)
      this.props.changed({ address: null })
    }
    this.props.valid('mietspiegel', false)
  }

  render() {
    const messages = defineMessages({
      title: {
        id: 'AddressInput.title',
        defaultMessage: 'Wo wohnst du?'
      },
      explanation: {
        id: 'AddressInput.explanation',
        defaultMessage: `Jede Straße in Berlin wurde von der Arbeitsgruppe Mietspiegel einem von drei Bereichen 
          zugeteilt: Einfach, Mittel oder Hoch. Für viele Straßen ist diese Einordnung auch je nach Hausnummer
          unterschiedlich. In diesem Feld suchst du nach dem Bereich, in den deine Wohnung fällt. `
      },
      explanation2: {
        id: 'AddressInput.explanation2',
        defaultMessage: `Wenn deine Straße mehrmals auftaucht und hinter dem Namen jeweils ein unterschiedlicher Bezirk 
          steht, gibt es die Straße entweder tatsächlich mehrmals in Berlin, oder verschiedene Teile davon wurden unterschiedlichen
          Mietbereichen zugeteilt. Finde dann den Eintrag, der deine Hausnummer umfasst.`
      },
      inputLabel: {
        id: 'AddressInput.label',
        defaultMessage: 'Deine Straße'
      }
    })

    // Linter complains about '!=', but it is necessary to compare against both
    // null and undefined as possible values
    // eslint-disable-next-line
    const inputField =
      this.state.address == undefined ? (
        <TextField
          id="addressInput"
          value={this.state.query}
          hintText={this.props.intl.formatMessage(messages.inputLabel)}
          onChange={this.handleChange}
        />
      ) : (
        undefined
      )

    return (
      <Card className="assistantInput" id={this.inputName}>
        <CardTitle
          title={this.props.intl.formatMessage(messages.title)}
          actAsExpander={true}
          showExpandableButton={true}
          closeIcon={<HelpIcon color={blue500} />}
        />
        <CardText expandable={true}>
          <p>
            <FormattedMessage {...messages.explanation} />
          </p>
          <p>
            <FormattedMessage {...messages.explanation2} />
          </p>
        </CardText>
        <CardText>
          {inputField}
          <MietspiegelPlace
            query={this.state.query}
            handleSelection={this.handleSelection}
            value={this.state.address}
          />
        </CardText>
      </Card>
    )
  }
}

type MietspiegelPlaceProps = {
  query: string,
  value: ?Address
}

class MietspiegelPlace extends React.Component {
  inputName = 'addressInput'

  state: {
    query: string,
    state: string,
    places: Array<{
      name: string,
      ranges: Array<{ name: string, id: string }>
    }>,
    selected?: Address,
    errorMsg: ?string
  }

  states = {
    WAITING: 'Waiting for query prop',
    REQUESTED: 'Waiting for API response',
    SELECTING: 'Waiting for user selection',
    FINISHED: 'Finished',
    ERROR: 'Error retrieving results.'
  }

  constructor(props: MietspiegelPlaceProps) {
    super(props)
    this.state = {
      query: props.query,
      state: this.states.WAITING,
      places: [],
      errorMsg: null
    }

    // eslint-disable-next-line eqeqeq
    if (props.value != undefined) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state['selected'] = props.value
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state['state'] = this.states.FINISHED
    }
    autoBind(this)
  }

  componentWillReceiveProps(nextProps: MietspiegelPlaceProps) {
    if (nextProps.query !== this.props.query) {
      // Wait until four characters have been entered, then show loading
      // indicator until some results have come in, then only update results
      // for new query characters without loading indicator.
      this.setState({
        query: nextProps.query,
        state:
          nextProps.query.length < 4
            ? this.states.WAITING
            : this.state.places.length === 0
              ? this.states.REQUESTED
              : this.states.SELECTING
      })
      if (nextProps.query.length >= 4) this.handleQuery(nextProps.query)
    }
  }

  handleQuery(query: string) {
    return fetch(serverURL + '/api/v1/street?name=' + encodeURIComponent(query))
      .then(resp => resp.json())
      .then(respJson => {
        if (respJson.errors && respJson.errors.length > 0) {
          this.setState({
            state: this.states.ERROR,
            errorMsg: respJson.errors[0]
          })
        } else {
          this.setState({
            places: respJson.data,
            state: this.states.SELECTING
          })
        }
      })
      .catch(() => {
        // console.error('Error handling address query.', error)
        this.setState({ state: this.states.ERROR })
      })
  }

  handleSelection(ev: SyntheticInputEvent, value: Address) {
    this.setState({ state: this.states.FINISHED, selected: value })
    this.props.handleSelection(value)
  }

  handleReset() {
    this.setState({ state: this.states.WAITING, selected: null })
    this.props.handleSelection(null)
  }

  render() {
    let menuItems = ''
    switch (this.state.state) {
    case this.states.REQUESTED:
      menuItems = (
        <span className="MietspiegelPlace">
          <FormattedMessage
            id={'AddressInput.placesLoading'}
            defaultMessage={'Lade Straßennamen...'}
          />
        </span>
      )
      break

    case this.states.SELECTING:
      menuItems = this.state.places.map(placeData => {
        const subMenu = placeData.ranges.map(rangeData => (
          <MenuItem
            primaryText={rangeData.name}
            key={rangeData.id}
            onClick={ev => {
              this.handleSelection(ev, {
                id: rangeData.id,
                streetname: placeData.name,
                range: rangeData.name
              })
            }}
            value={{
              id: rangeData.id,
              street: placeData.name,
              range: rangeData.name
            }}
          />
        ))

        if (subMenu.length > 1) {
          return (
            <MenuItem
              primaryText={placeData.name}
              key={placeData.name}
              rightIcon={<ArrowDropRight />}
              menuItems={subMenu}
            />
          )
        } else {
          return (
            <MenuItem
              primaryText={placeData.name}
              key={placeData.name}
              onClick={ev => {
                this.handleSelection(ev, {
                  id: placeData.ranges[0].id,
                  streetname: placeData.name,
                  range: placeData.ranges[0].name
                })
              }}
            />
          )
        }
      })
      break

    case this.states.FINISHED:
      menuItems = (
        <MenuItem
          key={'FINISHED-' + this.state.selected.streetname}
          leftIcon={<ClearIcon />}
          primaryText={this.state.selected.streetname}
          secondaryText={this.state.selected.range}
          onClick={this.handleReset}
        />
      )
      break

    case this.states.ERROR:
      menuItems = (
        <MenuItem
          children={
            <span>
              {this.state.errorMsg}{' '}
              <FormattedMessage
                id={'AddressInput.errorMessage'}
                defaultMessage={`Das hat leider nicht geklappt. 
              Bitte klicke hier um es nochmal zu versuchen.`}
              />
            </span>
          }
          leftIcon={<ErrorIcon />}
          onClick={() => this.handleQuery(this.state.query)}
        />
      )
      break
    default:
      menuItems = ''
    }
    return (
      <Menu
        disableAutoFocus={true}
        desktop={true}
        style={{ width: '99%' }}
        value={this.state.selected}
      >
        {menuItems}
      </Menu>
    )
  }
}

export default injectIntl(AddressInput)
