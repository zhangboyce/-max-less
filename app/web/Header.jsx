import React from "react";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Navbar,
    NavLink,
    Nav,
    Container,
} from "reactstrap";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Navbar className="navbar-absolute navbar-transparent" expand="lg">
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div className="logo">
                                <a href="#" className="simple-text logo-mini" target="_blank">
                                    <div className="logo-img">
                                        <img src="/static/images/logo.jpg" alt="react-logo" />
                                    </div>
                                </a>
                                <a href="#" className="simple-text logo-normal" target="_blank">
                                    MaxLess
                                </a>
                            </div>

                        </div>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    data-toggle="dropdown"
                                    nav
                                    onClick={e => e.preventDefault()}>
                                    <div className="photo">{ this.props.user && this.props.user.username }</div>
                                    <b className="caret d-none d-lg-block d-xl-block" />
                                    <p className="d-lg-none">Log out</p>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-navbar" right tag="ul">
                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item">Profile</DropdownItem>
                                    </NavLink>
                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item">Settings</DropdownItem>
                                    </NavLink>
                                    <DropdownItem divider tag="li" />
                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item" tag="a" href="/logout">Log out</DropdownItem>
                                    </NavLink>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <li className="separator d-lg-none" />
                        </Nav>
                    </Container>
                </Navbar>
        );
    }
}

export default Header;
