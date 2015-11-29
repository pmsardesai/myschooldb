import React from 'react';
import ResultRow from './ResultRow';

class ResultContainer extends React.Component {
	static propTypes = {
		/*
		* The result set to render
		*/
		result: React.PropTypes.object,

		/*
		* Determines if only the year was specified.
		*/
		yearOnly: React.PropTypes.string,
	}

	_renderPhoto() {
		let photo = null;

		if (this.props.yearOnly) {
			photo = <div className={this.props.yearOnly} />;
		}

		return photo;
	}

	_renderStudents() {
		let students = [];
		let result = this.props.result;

		if (result && result.length > 0) {
			for (let i = 0; i < result.length; i++) {
				students.push(<ResultRow key={i} student= { result[i] } />);
			}
		} else {
			students.push(
				<div className='no-results' key="none">
					<div className="fa fa-meh-o fa-4x"></div>
					<div>Sorry, no matches were found for your search.</div>
				</div>
			);
		}

		return students;
	}

	render() {
		return (
			<div className='result-container'>
				<div className='result-container-inner'>
					{ this._renderPhoto() }
					{ this._renderStudents() }
				</div>
			</div>
		);
	}
}

export default ResultContainer;
