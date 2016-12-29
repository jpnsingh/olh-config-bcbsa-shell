(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration', [
        require('./configurationFactory').name,
        require('./configurationController').name
    ]);
})();
