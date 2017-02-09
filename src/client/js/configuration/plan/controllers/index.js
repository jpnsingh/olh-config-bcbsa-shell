(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.controllers', [
        require('./config.plan.controller').name,
        require('./config.plan.setup.controller.js').name,
        require('./config.plan.additional.controller.js').name,
        require('./config.feature.pool.controller.js').name,
        require('./config.feature.assignment.controller.js').name
    ]);
})();