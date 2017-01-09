(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.user.services', [])
        .factory('User', require('./user'));
})();
