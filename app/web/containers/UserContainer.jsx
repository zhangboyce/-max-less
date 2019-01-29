'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import UserForm from "../components/user/UserForm";
import UserList from "../components/user/UserList";


class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            user: null
        }
    }

    handleUpdate = user => {
        this.setState({ editing: true, user: user });
    };

    cancel = () => {
        this.setState({ editing: false })
    };

    handleNew = () => {
        this.setState({ editing: true })
    };

    render() {
        let dom = this.state.editing ?
            <UserForm onCancel={ this.cancel }
                      user={ this.state.user } />:
            <UserList onUpdate={ this.handleUpdate } onNew={ this.handleNew } />;

        return (
            dom
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Object.assign({}, {}), dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserContainer));