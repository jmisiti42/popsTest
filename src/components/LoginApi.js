import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './LoginApi.css';

const USERNAME = "techtesting-dev";
const PASSWORD = "GFVSK-oNHB6";
const LOGIN_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/login";
const LOGOUT_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/logout";
const STATUSES_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/orders/statuses";

class LoginApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.findStatuses = this.findStatuses.bind(this);
    }

    handleLogout() {
        const { sessionToken, group } = this.props;
        
        axios.post(LOGOUT_URL, { sessionToken, group })
            .then(res => res.status === 200 ? this.props.dispatch({ type: "LOGOUT"}) : console.log(res))
            .catch(err => console.log({err}));
    }

    async findStatuses(sessionToken, group) {
        return await axios.get(STATUSES_URL, { sessionToken, group })
            .then(res => ({ statuses: res.data.data, sessionToken, group }))
            .catch(err => console.log({err}));
    }

    handleLogin() {
        const body = {
            username: USERNAME,
            password: PASSWORD,
        };

        axios.post(LOGIN_URL, body)
            .then(res => res.data.data)
            .then(({ sessionToken, group }) => this.findStatuses(sessionToken, group))
            .then(({ sessionToken, group, statuses }) => this.props.dispatch({ type: "LOGIN", sessionToken, isLoggedIn: true, group, statuses }))
            .catch(err => console.log({err}));
    }

    render() {
        const { isLoggedIn, sessionToken } = this.props;
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

const mapStateToProps = (state) => {
    const { isLoggedIn, sessionToken, group, statuses } = state;

    return {
        sessionToken,
        isLoggedIn,
        group,
        statuses,
    };
};

export default connect(mapStateToProps)(LoginApi);