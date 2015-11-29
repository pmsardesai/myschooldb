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
					<div className='content'>People's High School Database</div>
				</div>
				{ this.props.children }
				<div className='footer'>
					<div className='content'>2015 © Designed by Pooja Sardesai</div>
				</div>
			</div>
		);
	}
}

export default App;
