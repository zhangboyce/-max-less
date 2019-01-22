import { get, post } from  './__fetch__';
const config = require('../../common/__config__');
import * as types from './ActionTypes';

export function listOptions(shopId) {
    return dispatch => {
        get('/api/option/list', { shopId }).then(json => {
            dispatch({
                type: types.ORDER_OPTIONS,
                data: json.data
            });
        });
    };
}