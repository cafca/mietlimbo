// @flow

import React from 'react'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import { grey500 } from 'material-ui/styles/colors'

const baseHref = 'https://community.mietlimbo.de'
const searchHref = 'https://community.mietlimbo.de/search?q='

type FeatureInputProps = {
  title: any,
  expandable?: any, // actually JSX
  children?: any   // actually JSX
};

const FeatureInput = (props: FeatureInputProps) => {
  const expandableProps = props.expandable === null ? null : {
    actAsExpander: false,
    showExpandableButton: true,
    closeIcon: <HelpIcon color={grey500} />
  }

  const searchTerm = props.title && props.title.props && props.title.props.message

  const href = searchTerm === null ? baseHref 
    : searchHref + searchTerm

  return <Card className="assistantInput"> 
    <CardTitle title={props.title} {...expandableProps} />
    {props.expandable !== null &&
      <CardText expandable={true}>
        { props.expandable }
        <RaisedButton
          href={href}
          target="_blank"
          icon={<HelpIcon />}
          label={<FormattedMessage id="FeatureInput.button" defaultMessage="Mehr Wissen im Forum" />}
          primary={true}
        />
      </CardText>
    }
    { props.children }
  </Card>
}

export default FeatureInput