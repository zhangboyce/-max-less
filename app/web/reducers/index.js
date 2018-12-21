'use strict';
import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';

export default combineReducers({
    user,
});

function user(state = {  }, action) {
    switch (action.type) {
        case types.USER_INFO: {
            return action.data;
        }
        default:
            return state;
    }
}