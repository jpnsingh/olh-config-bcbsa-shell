(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.plan', [
            require('./config.plan.setup.controller').name,
            require('./config.plan.additional.controller').name
        ]).config(require('./config.plan.state.config.js'));
})();
