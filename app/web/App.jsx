import React, { Component } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from "react-router-dom";
import * as UserActions from "./actions/user";
import routers from './routers';

class App extends Component {
    componentDidMount() {
        this.props.actions.getUserInfo();
    }

    render() {
        console.log('rrrr app')
        return (
            <div className="wrapper">
                <Sidebar { ...this.props } />
                <div className="main-panel" ref="mainPanel" data="blue">
                    <Header brandText="" { ...this.props } sidebarOpened={ true } />
                    <div className="content">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    DashboardContainer
                                </div>
                            </div>
                        </div>
                    </div>
                    <Switch>
                    {
                        this.props.menus.map(menu => (
                            <Route key={ menu._id } path={ menu.path } component={ routers[menu.path] }/>
                        ))
                    }
                    </Switch>
                    <Footer fluid />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        menus: state.menu.list,
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