import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './OrderApi.css';

const ORDERS_URL = "https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/orders";

class OrderApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: false,
            page: '',
            lastId: '',
            prevLastId: '',
            status: 'paid'
        };

        this.getOrder = this.getOrder.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
    }

    getOrder() {
        const { sessionToken, isLoggedIn, group, statuses } = this.props;
        const tempState = this.state;
        const { page, status, sorting } = tempState;
        axios.get(ORDERS_URL, {
            params: {
                orderStatus: status,
                limit: 15,
                offsetOrderId: page === '' ? undefined : page,
                scanIndexForward: sorting,
            },
            headers: {
                sessionToken,
            }})
            .then(res =>
                res.data.data.map((el, i) => {
                    tempState.page = el.orderId;
                    if (i === res.data.data.length - 1 && (tempState.lastId = el.orderId))
                        this.setState(tempState);
                    else if (i === 0 && (tempState.prevLastId = el.orderId))
                        this.setState(tempState);
                    return ({ 
                        price: `${el.priceFinal} ${el.currency}`, 
                        mail: el.email, 
                        firstname: el.address ? el.address.firstname : 'Unknown', 
                        lastname: el.address ? el.address.lastname : 'Unknown',
                    });
                }))
            .then(res => this.props.dispatch({ type: "SET_ORDERS", sessionToken, isLoggedIn, group, statuses, orders: res }))
            .catch(err => console.log({err}))
    }

    handleSorting(e) {
        const { page, status } = this.state;
        this.setState({ sorting: e.target.checked, page, status });
    }

    handlePage(modifier) {
        const { status, sorting } = this.state;
        switch (modifier) {
            case '+':
                this.setState({ status, sorting, page: this.state.lastId}, () => this.getOrder());
                break ;
            case '-':
                this.setState({ status, sorting, page: this.state.prevLastId}, () => this.getOrder())
                break ;
            default:
                this.setState({ status, sorting, page: ''}, () => this.getOrder())
                break ;
        }
    }

    handleStatus(e) {
        const { sorting, page } = this.state;
        this.setState({ page, status: e.target.value, sorting });
    }

    render() {
        const { statuses, isLoggedIn } = this.props;
        const { sorting, page } = this.state;
        return (
            <div>
                {(isLoggedIn === true && statuses.length > 0) ?
                    <div className="row">
                        <div className="col-4">
                            <label className="form-control-label" htmlFor="status">Status :</label>
                            <select className="form-control" value={this.state.status} onChange={this.handleStatus} id="status">
                                {statuses.map((el, i) => {     
                                    return (<option key={i} value={el}>{el}</option>) 
                                })}
                            </select>
                        </div>
                        <div className="col-2">
                            <label className="form-check-label" htmlFor="sorting">{sorting === false ? <p>Tri croissant (Coché)</p> : <p>Tri décroissant (Décoché)</p>}</label>
                            <input type="checkbox" onChange={this.handleSorting} checked={this.state.sorting} id="sorting" />
                        </div>
                        <div className="col-3">
                            {page === '' ? 
                              <button type="submit" className="btn btn-primary" onClick={this.getOrder}>Chercher</button>
                            :
                                <span><button type="submit" onClick={() => this.handlePage('-')} className="btn btn-primary">{"<"} </button>
                                <button type="submit" className="btn btn-primary" onClick={() => this.handlePage()}>Chercher</button>
                                <button type="submit" onClick={() => this.handlePage('+')} className="btn btn-primary">{">"}</button></span>}
                            
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { isLoggedIn, sessionToken, group, statuses, orders } = state;

    return {
        sessionToken,
        isLoggedIn,
        group,
        statuses,
        orders,
    };
};

export default connect(mapStateToProps)(OrderApi);