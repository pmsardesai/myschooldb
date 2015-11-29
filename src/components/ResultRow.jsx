import React from 'react';

class ResultRow extends React.Component {
	static propTypes = {
		/*
		* The student data object.
		*/ 
		student: React.PropTypes.object,

		/*
		* Custom CSS to be applied to the row
		*/ 
		customClass: React.PropTypes.string
	}

	render() {
		let student = this.props.student;
		let name = (student.first ? student.first : '') + ' ' +
				(student.middle ? student.middle : '') + ' ' +
				(student.last ? student.last : '');
		let alias = student.alias ? '(' + student.alias + ')' : '';

		let customClass = 'result-row ' + (this.props.customClass || '');
		return (
			<div className={customClass}>
				<div className='name'>
					<span className='full'>{name}</span>
					<span className='alias'>{alias}</span>
				</div>
				<div className='year'>{student.year}</div>
			</div>
		);
	}
}

export default ResultRow;
