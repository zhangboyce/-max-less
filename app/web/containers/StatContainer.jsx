'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import StatForm from '../components/stat/StatForm';
import StatList from '../components/stat/StatList';
import * as AppActions from "../actions/app";


class StatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stat: null
        }
    }

    componentDidMount() {
        this.props.actions.listOptions(this.props.currentShop._id);
    }

    handleUpdate = stat => {
        this.setState({ editing: true, stat: stat });
    };

    cancel = () => {
        this.setState({ editing: false })
    };

    render() {
        let dom = this.state.editing ?
            <StatForm onCancel={ this.cancel }
                      options={ this.props.options }
                       shop={ this.props.currentShop }
                       stat={ this.state.stat } />:
            <StatList  shop={ this.props.currentShop }
                        onUpdate={ this.handleUpdate } />;

        return (
            dom
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
        actions: bindActionCreators(Object.assign({}, AppActions), dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(StatContainer));