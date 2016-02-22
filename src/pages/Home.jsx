import React from 'react';
import $ from 'jquery';
import ResultContainer from '../components/ResultContainer';

class Home extends React.Component {
	constructor(props) {
		super(props);

		/*
		* The state of this widget.
		*/
		this.state = {searchParams: {}, result: [], loaded: false, useYear: false };
	}

	/*
	* If textbox value changed, clear year field.
	* If enter pressed, search.
	*/
	_onKeyPress(event) {
		$("#yearBox").val('');

		if (event.charCode === 13) {
			this._search();
		}

		this.setState({useYear: false});
	}

	/*
	* When year changes, clear other fields.
	*/
	_onYearChange(year) {
		$("#firstBox").val('');
		$("#middleBox").val('');
		$("#lastBox").val('');

		if (year.currentTarget) {
			year = $("#yearBox").val();
			this.setState({useYear: (year !== '') });
		} else {
			$("#yearBox").val(year);
			this.setState({useYear: !!year });
		}

		this._search();
	}

	/*
	* Gets data from MongoDB.
	*/
	_search() {
		let parms = {
			first: $("#firstBox").val(),
			middle: $("#middleBox").val(),
			last: $("#lastBox").val(),
			year: $("#yearBox").val()
		};

		let me = this;
		$.ajax({
	 		url: '/search',
			dataType: 'json',
			data: parms,
			success: function success(data) {
				let yearOnly = 
					!(parms.first || parms.middle || parms.last) && parms.year || '';

				me.setState({ yearOnly: yearOnly, loaded: true, result: data});
			},
			error: function error(xhr, status, err) {
				console.error(err);
			}
		});
	}

	/*
	* Render years in the dropdown.
	*/
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
		let yearPlaceholderCss = "placeholder " + (this.state.useYear ? 'hidden' : '');

		return (
			<div className='home'>
				<div className='search-container'>
					<div className='input'>
						<div className='top'>
							<input className="textbox first"
								type="text"
								id="firstBox"
								placeholder="First"
								onKeyPress={this._onKeyPress.bind(this)}
							/>
							<input className="textbox middle"
								type="text"
								id="middleBox"
								placeholder="Middle"
								onKeyPress={this._onKeyPress.bind(this)}
							/>
							<input className="textbox last"
								type="text"
								id="lastBox"
								placeholder="Last"
								onKeyPress={this._onKeyPress.bind(this)}
							/>
						</div>
						<span className="or">
							OR
						</span>
						<div className="bottom">
							
							<select className="year" 
								type="select" 
								id="yearBox"
								defaultValue="empty"
								onChange={this._onYearChange.bind(this)}
								>
								{ this._renderYearItems() }
							</select>
							<div className={yearPlaceholderCss}>Year</div>
						</div>
					</div>
					<a className="submit fa fa-2x fa-search"
						onClick={this._search.bind(this)}
					/>
				</div>
				
				<ResultContainer result={this.state.result} 
								 yearOnly={this.state.yearOnly} 
				 				 loaded={this.state.loaded}
				 				 onYearClick={this._onYearChange.bind(this)} />
				 				
			</div>
		);
	}
}

export default Home;
