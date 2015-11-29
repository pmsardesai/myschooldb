import React from 'react';
import $ from 'jquery';
import ResultContainer from '../components/ResultContainer';

class Home extends React.Component {
	constructor(props) {
		super(props);

		/*
		* The state of the menu. It can be 'pinned' or 'unpinned'.
		* Default: 'unpinned'
		*/
		this.state = {searchParams: {}, result: {}};
	}

	_onTextChange(event) {
		if (event.keyCode === 13) {
			this._search();
		}
	}

	_search() {
		let parms = {
			first: $("#firstBox").val(),
			middle: $("#middleBox").val(),
			last: $("#lastBox").val(),
			alias: $("#aliasBox").val(),
			year: $("#yearBox").val()
		};

		let me = this;
		$.ajax({
	 		url: '/search',
			dataType: 'json',
			data: parms,
			success: function success(data) {
				let yearOnly = 
					!(parms.first || parms.middle || parms.last || parms.alias) && parms.year;

				me.setState({ yearOnly: yearOnly, result: data});

				//console.log(data);
			},
			error: function error(xhr, status, err) {
				console.error(err);
			}
		});
	}

	_renderYearItems() {
		let years = [];
		// add an empty option for user to clear out
		years.push(<option key="empty" value=""></option>);

		for (let i = 1942; i < 2013; i++) {
			if (i === 1975) {
				// there were two years in 1975
				years.push(<option key={i + 'n'} value={i + 'n'}>{i + 'n'}</option>);
				years.push(<option key={i + 'o'} value={i + 'o'}>{i + 'o'}</option>);
			} else {
				years.push(<option key={i} value={i}>{i}</option>);
			}
		}

		return years; 
	}

	render() {
		return (
			<div className='home'>
				<div className='search-container'>
					<div className='input'>
						<div className='top'>
							<input className="textbox first"
								type="text"
								id="firstBox"
								placeholder="First"
								onChange={this._onTextChange.bind(this)}
							/>
							<input className="textbox middle"
								type="text"
								id="middleBox"
								placeholder="Middle"
								onChange={this._onTextChange.bind(this)}
							/>
						</div>
						<div className='middle'>
							<input className="textbox last"
								type="text"
								id="lastBox"
								placeholder="Last"
								onChange={this._onTextChange.bind(this)}
							/>
							<input className="textbox alias"
								type="text"
								id="aliasBox"
								placeholder="Alias"
								onChange={this._onTextChange.bind(this)}
							/>
						</div>
						<div className='bottom'>
							<select className="year" 
								type="select" 
								id="yearBox"
								defaultValue="empty"
								onChange={this._onTextChange.bind(this)}
								>
								{ this._renderYearItems() }
							</select>
						</div>
					</div>
					<a className="submit fa fa-2x fa-search"
						onClick={this._search.bind(this)}
					/>
				</div>
				
				<ResultContainer result={this.state.result} yearOnly={this.state.yearOnly} />
			</div>
		);
	}
}

export default Home;
