import React from 'react';

class Home extends React.Component {
	render() {
		const className = 'home';

		return (
			<div className={className}>
				<input type="text"
					placeholder="First"
				/>
				<input type="text"
					placeholder="Last"
				/>
				<input type="submit"
					value="Submit"
				/>
			</div>
		);
	}
}

export default Home;
