import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import Upload from './pages/Upload';
import { createHistory } from 'history';

const browserHistory = createHistory();

ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home} />
			<Route path="/upload" component={Upload} />
		</Route>
	</Router>
), document.getElementById('react-root'));
