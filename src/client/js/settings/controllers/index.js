(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.settings.controllers', [
        require('./accountsController').name,
        require('./profileController').name
    ]);
})();
