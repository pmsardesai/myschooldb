import React from 'react';
import ResultRow from './ResultRow';

class ResultContainer extends React.Component {
	static propTypes = {
		/*
		* The result set to render
		*/
		result: React.PropTypes.array,

		/*
		* Determines if only the year was specified.
		*/
		yearOnly: React.PropTypes.string,

		/*
		* Determines if this is the first time the page is being loaded
		*/
		loaded: React.PropTypes.bool,

		/*
		* If year is clicked in ResultRow, pass the year back to 
		* home page so that it loads students from that year.
		*/
		onYearClick: React.PropTypes.func
	}

	_onYearClick(student) {
		this.props.onYearClick(student.year);
	}

	_renderPhoto() {
		let photo = null;

		if (this.props.yearOnly) {
			let isPhoto = this.props.result[0].isPhoto;

			if (isPhoto) {
				// check if year exists first
				let divStyle = {
					backgroundImage: 'url(images/' + this.props.yearOnly + '.jpeg)'
				};
				photo = <div className='photo' style={divStyle} />;
			}
		}

		return photo;
	}

	_renderStudents() {
		let students = [];
		let result = this.props.result;

		if (result && result.length > 0) {
			for (let i = 0; i < result.length; i++) {
				let cssClass = '';
				if (i === 0) {
					cssClass = 'first';
				}
				students.push(<ResultRow customClass={cssClass} 
					onYearClick={this._onYearClick.bind(this, result[i])}
					key={i} student= { result[i] } />);
			}
		} else if (this.props.loaded) {
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
		let cssClass = 'result-container' +
			(this.props.yearOnly ? ' hide-year' : '');

		return (
			<div className={cssClass}>
				<div className='result-container-inner'>
					{ this._renderPhoto() }
					{ this._renderStudents() }
				</div>
			</div>
		);
	}
}

export default ResultContainer;
