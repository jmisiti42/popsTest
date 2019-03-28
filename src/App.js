import React, { Component } from 'react';
import { Provider } from 'react-redux'
import LoginApi from './components/LoginApi.js';
import OrderApi from './components/OrderApi.js';
import Result from './components/Result.js';
import store from './store.js';
import './App.css';

class App extends Component {
	render() {
		return (
            <Provider store={store}>
				<div className="App container-fluid">
					<div className="row text-center">
						<div className="col-2"><LoginApi /></div>
						<div className="col-10"><OrderApi /></div>
					</div>
					<br />
					<Result />
				</div>
			</Provider>
		);
	}
}

export default App;
