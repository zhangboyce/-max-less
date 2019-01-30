'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import OrderForm from '../components/order/OrderForm';
import OrderList from '../components/order/OrderList';

import * as AppActions from "../actions/app";
import * as OrderActions from "../actions/order";

class OrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            order: null
        }
    }

    componentDidMount() {
        this.props.actions.listOptions(this.props.currentShop._id);
    }

    cancel = () => {
        this.setState({ editing: false })
    };

    handleNew = () => {
        this.setState({ editing: true })
    };

    handleUpdate = order => {
        this.setState({ editing: true, order: order });
    };

    render() {
        let dom = this.state.editing ?
            <OrderForm onCancel={ this.cancel }
                       shop={ this.props.currentShop }
                       order={ this.state.order }
                       options={ this.props.options } />:
            <OrderList  shop={ this.props.currentShop }
                        onNew={ this.handleNew }
                        user={ this.props.user }
                        onUpdate={ this.handleUpdate }/>;

        return (
            dom
        );
    }
}

const mapStateToProps = state => {
    return {
        options: state.options,
        currentShop: state.shop.current,
        user: state.user,
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