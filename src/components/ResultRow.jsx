import React from 'react';

class ResultRow extends React.Component {
	static propTypes = {
		/*
		* The student data object.
		*/ 
		student: React.PropTypes.object,
	}

	render() {
		let student = this.props.student;
		let name = (student.first ? student.first : '') + ' ' +
				(student.middle ? student.middle : '') + ' ' +
				(student.last ? student.last : '');
		let alias = student.alias ? student.alias : '';
		return (
			<div className='result-row'>
				<div className='name'>
					<div className='full'>{name}</div>
					<div className='alias'>{alias}</div>
				</div>
				<div className='year'>{student.year}</div>
			</div>
		);
	}
}

export default ResultRow;
