import React from 'react';
import axios from 'axios';
import './OrderApi.css';

const USERNAME = "techtesting-dev";
const PASSWORD = "GFVSK-oNHB6";
const LOGIN_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/login";
const LOGOUT_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/logout";

class OrderApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            sessionToken: "",
            group: "",
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { sessionToken, group } = this.state;
        axios.post(LOGOUT_URL, { sessionToken, group })
            .then(res => res.status === 200 ? this.setState({ sessionToken: '', group: '', isLoggedIn: false }) : console.log(res))
            .catch(err => console.log({err}));
    }

    handleLogin() {
        const body = {
            username: USERNAME,
            password: PASSWORD,
        };
        axios.post(LOGIN_URL, body)
            .then(res => res.data.data)
            .then(({ sessionToken, group }) => this.setState({ sessionToken, group, isLoggedIn: true }))
            .catch(err => console.log({err}));
    }

    render() {
        const { isLoggedIn, sessionToken, group } = this.state;
        console.log({isLoggedIn, sessionToken, group})
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

export default OrderApi;