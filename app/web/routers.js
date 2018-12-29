'use strict';
import DashboardContainer from './containers/DashboardContainer'
import OrderContainer from './containers/OrderContainer'
import ShopContainer from './containers/ShopContainer'
import UserContainer from './containers/UserContainer'
import StatContainer from './containers/StatContainer'

export default {
    "/dashboard": DashboardContainer,
    "/order_manage": OrderContainer,
    "/shop_manage": ShopContainer,
    "/user_manage": UserContainer,
    "/stat_manage": StatContainer,
}