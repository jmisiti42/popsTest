import { createStore } from 'redux';

function pops(state = { sessionToken: '', isLoggedIn: false, group: '' }, action) {
	const { sessionToken, isLoggedIn, group, statuses, orders, type } = action;
	switch (type) {
		case 'LOGIN':
			return state = { sessionToken, isLoggedIn, orders, group, statuses };
		case 'LOGOUT':
			return state = { sessionToken: '', isLoggedIn: false, orders: [], group: '', statuses: [], };
		case 'SET_ORDERS':
			return state = { sessionToken, isLoggedIn, group, statuses, orders };
		default:
			return state;
	}
}

const store = createStore(pops, { sessionToken: '', isLoggedIn: false, group: '', orders: [], statuses: [], });

export default store;