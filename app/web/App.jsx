import React, { Component } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default class App extends Component {
    toggleSidebar = () => {

    };

    render() {
        return (
            <div className="wrapper">
                <Sidebar toggleSidebar={ this.toggleSidebar } />
                <div className="main-panel" ref="mainPanel" data="blue">
                    <Header
                        brandText=""
                        toggleSidebar={this.toggleSidebar}
                        sidebarOpened={ true }
                    />
                    { this.props.children }
                    <Footer fluid />
                </div>
            </div>
        )
    }
}
