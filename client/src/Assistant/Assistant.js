import React from 'react';
import autoBind from 'react-autobind';

import BasicData from './BasicData';

class Assistant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 0
		}
		autoBind(this);
	}

	render() {
		switch(this.state.stage) {
			case 0:
				return <BasicData />;

			default:
				return "Nah";
		}
	}
}

export default Assistant;