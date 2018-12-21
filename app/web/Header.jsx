import React from "react";
import classNames from "classnames";
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container,
} from "reactstrap";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            modalSearch: false,
            color: "navbar-transparent"
        };
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateColor);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColor);
    }
    updateColor = () => {
        if (window.innerWidth < 993 && this.state.collapseOpen) {
            this.setState({
                color: "bg-white"
            });
        } else {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    toggleCollapse = () => {
        if (this.state.collapseOpen) {
            this.setState({
                color: "navbar-transparent"
            });
        } else {
            this.setState({
                color: "bg-white"
            });
        }
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    // this function is to open the Search modal
    toggleModalSearch = () => {
        this.setState({
            modalSearch: !this.state.modalSearch
        });
    };
    render() {
        return (
                <Navbar
                    className={classNames("navbar-absolute", this.state.color)}
                    expand="lg"
                >
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div
                                className={classNames("navbar-toggle d-inline", {
                                    toggled: this.props.sidebarOpened
                                })}
                            >
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={this.props.toggleSidebar}
                                >
                                    <span className="navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                </button>
                            </div>
                            <NavbarBrand href="#" onClick={e => e.preventDefault()}>
                                南京店
                            </NavbarBrand>
                        </div>
                        <button
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navigation"
                            data-toggle="collapse"
                            id="navigation"
                            type="button"
                            onClick={this.toggleCollapse}
                        >
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                        </button>
                        <Collapse navbar isOpen={this.state.collapseOpen}>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        nav
                                        onClick={e => e.preventDefault()}
                                    >
                                        <div className="photo">
                                            Boyce
                                        </div>
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
                                        <NavLink tag="li" href="/logout">
                                            <DropdownItem className="nav-item">Log out</DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <li className="separator d-lg-none" />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
        );
    }
}

export default Header;
