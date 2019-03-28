import React from 'react';
import { connect } from 'react-redux';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { orders } = this.props;
        return (
            <div>
                {(orders && orders.length > 0) ?
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((el, i) => {     
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{el.firstname}</td>
                                        <td>{el.lastname}</td>
                                        <td>{el.mail}</td>
                                        <td>{el.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    :
                    <span></span>
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

export default connect(mapStateToProps)(Result);