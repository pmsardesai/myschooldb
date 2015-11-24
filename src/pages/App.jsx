import React from 'react';

class App extends React.Component {
	static propTypes = {
		/*
		* The list of different routes.
		*/
		children: React.PropTypes.object
	}

	render() {
		const className = 'main-app';

		return (
			<div className={className}>
				{ this.props.children }
			</div>
		);
	}
}

export default App;
