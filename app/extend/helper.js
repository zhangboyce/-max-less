'use strict';
/**
 * Created by Boyce on 18/8/30.
 */
module.exports = {
  isAdmin(user) {
    return user
        && user.permissions
        && user.permissions.findIndex(it => it.roleId === 'admin') !== -1;
  }
};

