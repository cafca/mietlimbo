// @flow

import React from 'react';
import autoBind from 'react-autobind';

import BasicData from './BasicData';

class Assistant extends React.Component {
	state = {
		stage: 0
	}

	constructor(props: {}) {
		super(props);
		autoBind(this);
	}

	render() {
		switch(this.state.stage) {
			case 0:
			default:
				return <BasicData />;
		}
	}
}

export default Assistant;