import React from 'react';

class App extends React.Component {
	static propTypes = {
		/*
		* The list of different routes.
		*/
		children: React.PropTypes.object
	}

	render() {
		return (
			<div className='main-app'>
				<div className='main-header'>
					<div className='title'>People's High School Database</div>
				</div>
				{ this.props.children }
			</div>
		);
	}
}

export default App;
