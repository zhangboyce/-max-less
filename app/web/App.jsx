import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import * as UserActions from "./actions/user";
import routers from './routers';

class App extends Component {
    componentDidMount() {
        this.props.actions.getUserInfo();
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar { ...this.props } />
                <div className="main-panel" ref="mainPanel" data="blue">
                    <Header brandText="" { ...this.props } sidebarOpened={ true } />
                    <Switch>
                        <Redirect from='/' exact to='/order_manage'/>
                    {
                        this.props.menus.map(menu => (
                            <Route key={ menu._id } path={ menu.path } component={ routers[menu.path] }/>
                        ))
                    }
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        menus: state.menu.list
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));