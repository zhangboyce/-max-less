'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import OrderForm from '../components/order/OrderForm';

import * as AppActions from "../actions/app";
import * as OrderActions from "../actions/order";

class OrderContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.listOptions(this.props.currentShop._id);
    }

    render() {
        return (
            <OrderForm options={ this.props.options } />
        );
    }
}

const mapStateToProps = state => {
    return {
        options: state.options,
        currentShop: state.shop.current
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Object.assign({}, AppActions, OrderActions), dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(OrderContainer));