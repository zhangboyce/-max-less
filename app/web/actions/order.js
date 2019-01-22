import { get, post } from  './__fetch__';
import * as types from './ActionTypes';

export function saveOrder(order) {
    return dispatch => {
        post('/api/order/save', { order }).then(json => {
            // dispatch({
            //     type: types.SHOP_LIST,
            //     data: json.data
            // });
        });
    };
}
