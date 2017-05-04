// @flow

import React from 'react';
import autoBind from 'react-autobind';

import BasicData from './BasicData';
import Introduction from './Introduction';
import { FormattedMessage, FormattedDate } from 'react-intl';

const Header = (props) => {
  const style = {
    main: {
      marginBottom: "2em"
    },
    items: {
      marginRight: 5
    }
  }
  return <section style={style.main}>
    <span style={style.items}>#{props.serialNumber}</span>
    <span style={style.items}><FormattedDate value={new Date()} /></span>
  </section>;
}

class Assistant extends React.Component {
	state = {
		stage: 0,
		serialNumber: "03"
	}

	constructor(props: {}) {
		super(props);
		autoBind(this);
	}

	handleContinue(e: Event) {
		this.setState({stage: (this.state.stage + 1)});
	}

	render() {
		let content;
		switch(this.state.stage) {
			case 1:
				content = <BasicData />;
				break;

			case 0:
			default:
				content = <Introduction serialNumber={this.state.serialNumber} />;
		}

		return <div className="assistant">
          <Header serialNumber={this.state.serialNumber} stage={this.state.stage} />
          {content}
          <button onClick={this.handleContinue}>
          	<FormattedMessage
          		id="Assistant.continue"
          		defaultMessage="Continue"
          	/>
          </button>
		</div>;
	}
}

export default Assistant;