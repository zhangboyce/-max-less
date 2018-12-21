'use strict';
const c = {  };

const set = function (obj) {
    Object.assign(c, obj);
};

const get = function (key) {
    return c[key];
};

module.exports = { set, get };
