import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav } from "reactstrap";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar" data='blue'>
                <div className="sidebar-wrapper" ref="sidebar">
                    <div className="logo">
                        <a href="#" className="simple-text logo-mini" target="_blank">
                            <div className="logo-img">
                                <img src="/static/images/logo.jpg" alt="react-logo" />
                            </div>
                        </a>
                        <a href="#" className="simple-text logo-normal" target="_blank">
                            Max Less
                        </a>
                    </div>
                    <Nav>
                        <li className="active">
                            <Link to="" className="nav-link" activeClassName="active" onClick={ this.props.toggleSidebar } >
                                <i className="tim-icons icon-align-center" />
                                <p>南京店</p>
                            </Link>
                        </li>
                    </Nav>
                </div>
            </div>
        )
    }
}
