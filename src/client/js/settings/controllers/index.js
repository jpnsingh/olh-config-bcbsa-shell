(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.settings.controllers', [
        require('./settingsController').name,
        require('./accountsController').name,
        require('./profileController').name
    ]);
})();
