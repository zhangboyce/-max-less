import { get, post } from  './__fetch__';
import * as types from './ActionTypes';

export function listShops() {
    return dispatch => {
        get('/api/shop/list').then(json => {
            dispatch({
                type: types.SHOP_LIST,
                data: json.data
            });
        });
    };
}

export function selectShop({ shop }) {
    return {
        type: types.SHOP_CURRENT,
        data: shop
    }
}

export function listMenus({ shopId }) {
    return dispatch => {
        get('/api/menu/list', { shopId }).then(json => {
            dispatch({
                type: types.MENU_LIST,
                data: json.data
            });
        });
    };
}