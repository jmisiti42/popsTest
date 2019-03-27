import React from 'react';
import axios from 'axios';
import './LoginApi.css';

const USERNAME = "techtesting-dev";
const PASSWORD = "GFVSK-oNHB6";
const LOGIN_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/login";
const LOGOUT_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/logout";

class LoginApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { sessionToken, group } = this.props.store.getState();
        axios.post(LOGOUT_URL, { sessionToken, group })
            .then(res => res.status === 200 ? this.props.store.dispatch({ type: "LOGOUT"}) : console.log(res))
            .catch(err => console.log({err}));
    }

    handleLogin() {
        const body = {
            username: USERNAME,
            password: PASSWORD,
        };
        axios.post(LOGIN_URL, body)
            .then(res => res.data.data)
            .then(({ sessionToken, group }) => this.props.store.dispatch({ type: "LOGIN", sessionToken, isLoggedIn: true, group }))
            .catch(err => console.log({err}));
    }

    render() {
        const { isLoggedIn, sessionToken } = this.props.store.getState();
        console.log(this.props.store.getState());
        return (
            <div className="Login">
                {(isLoggedIn === true && sessionToken !== "") ?
                    <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
                    :
                    <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                }
            </div>
        );
    }
}

export default LoginApi;