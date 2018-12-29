import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavLink,
    Nav,
} from "reactstrap";
import * as ShopActions from './actions/shop';

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.listShops();
    }

    componentWillReceiveProps(nextProps) {
        let currentShop = nextProps.currentShop;
        if (currentShop && currentShop._id !== this.props.currentShop._id) {
            this.props.actions.listMenus({ shopId: currentShop._id });
        }
    }

    changeShop = (shop) => {
        return () => {
            if (shop._id === this.props.currentShop._id) return;
            this.props.actions.selectShop({ shop });
        };
    };

    render() {
        let $dropdownItems = this.props.shops.map(shop => (
            <NavLink tag="li" key={ shop._id } >
                <DropdownItem className="nav-item" tag="a" onClick={ this.changeShop(shop) }>{ shop.name }</DropdownItem>
            </NavLink>
        ));

        return (
            <div className="sidebar" data='blue'>
                <div className="sidebar-wrapper" ref="sidebar">
                    <div className="shop-dropdown">
                        <UncontrolledDropdown>
                            <DropdownToggle
                                color="default"
                                data-toggle="dropdown"
                                nav
                                onClick={e => e.preventDefault()}>
                                <div className="shop-name">{ this.props.currentShop.name }</div>
                            </DropdownToggle>
                            {
                                $dropdownItems &&
                                $dropdownItems.length !== 0 &&
                                <DropdownMenu className="dropdown-navbar" tag="ul">
                                    { $dropdownItems }
                                </DropdownMenu>
                            }
                        </UncontrolledDropdown>
                    </div>
                    <Nav>
                        {
                            this.props.menus.map(menu => (
                                <li key={ menu._id }
                                    className={ this.props.currentMenu._id === menu._id ? 'active': '' }>
                                    <Link to={ menu.path } className="nav-link">
                                        <i className={ menu.icon } />
                                        <p>{ menu.name }</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </Nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        shops: state.shop.list,
        currentShop: state.shop.current,
        menus: state.menu.list,
        currentMenu: state.menu.current,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Object.assign({}, ShopActions), dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Sidebar));
