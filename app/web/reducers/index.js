'use strict';
import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';
import shopCombineReducers from './shop';
import menuCombineReducers from './menu';

export default combineReducers({
    user,
    shop,
    menu,
    options
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

function options(state = {  }, action) {
    switch (action.type) {
        case types.ORDER_OPTIONS: {
            return action.data;
        }
        default:
            return state;
    }
}

function shop(state = {}, action) {
    return shopCombineReducers(state, action);
}

function menu(state = {}, action) {
    return menuCombineReducers(state, action);
}