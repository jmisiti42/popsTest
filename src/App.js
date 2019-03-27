import React, { Component } from 'react';
import LoginApi from './components/LoginApi.js';
//import OrderApi from './components/OrderApi.js';
import { createStore } from 'redux'
import './App.css';

function pops(state = { sessionToken: '', isLoggedIn: false, group: '' }, action) {
	const { sessionToken, isLoggedIn, group, type } = action;
	console.log(action)
	switch (type) {
		case 'LOGIN':
			return Object.assign({}, state, { sessionToken, isLoggedIn, group });
		case 'LOGOUT':
			return Object.assign({}, state, { sessionToken: '', isLoggedIn: false, group: '' });
		default:
			return { sessionToken, isLoggedIn, group };
	}
}

class App extends Component {
	render() {
		const store = createStore(pops, { sessionToken: '', isLoggedIn: false, group: '', });

		return (
			<div className="App container-fluid">
				<div className="row text-center">
					<div className="col-3"><LoginApi store={store} /></div>
				</div>
			</div>
		);
	}
}

export default App;
