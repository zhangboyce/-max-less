import { get, post } from  './__fetch__';
const config = require('../../common/__config__');
import * as types from './ActionTypes';

export function getUserInfo() {
    return {
        type: types.USER_INFO,
        data: JSON.parse(config.get('user'))
    }
}