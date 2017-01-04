(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.controllers', [
        require('./login.controller').name,
        require('./register.controller').name,
        require('./logout.controller').name
    ]);
})();
