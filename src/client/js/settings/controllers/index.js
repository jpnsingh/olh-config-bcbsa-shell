(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.settings.controllers', [
        require('./accounts.controller').name,
        require('./profile.controller').name
    ]);
})();
