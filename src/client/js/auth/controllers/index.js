(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.controllers', [
        require('./loginController').name,
        require('./registerController').name,
        require('./logoutController').name
    ]);
})();
