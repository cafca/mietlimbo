import React from 'react';
import autoBind from 'react-autobind';

class BasicData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leaseCreated: new Date()
		}
		autoBind(this);
	}

	handleChange(e) {
		const field = e.target.name;
		this.setState({[field]: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("Submitted", this.state)
	}

	render () {
	return <form onSubmit={this.handleSubmit}>
		<label>
			Vertragsabschluss:
			<input 
				name="leaseCreated"
				type="date"
				value={this.state.leaseCreated} 
				onChange={this.handleChange} 
			/>
		</label>
	</form>;
	}
}

export default BasicData;