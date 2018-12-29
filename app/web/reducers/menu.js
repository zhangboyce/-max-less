'use strict';
import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';

export default combineReducers({
    list,
    current,
});

function list(state = [], action) {
    switch (action.type) {
        case types.MENU_LIST: {
            return action.data;
        }
        default:
            return state;
    }
}

function current(state = {}, action) {
    switch (action.type) {
        case types.MENU_LIST: {
            let list = action.data || [];
            if (list.length !== 0) return list[0];
            else return { };
        }

        case types.MENU_CURRENT: {
            return action.data;
        }
        default:
            return state;
    }
}