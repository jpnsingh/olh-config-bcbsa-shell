(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.controllers', [
        require('./signInController').name,
        require('./signOutController').name
    ]);
})();
