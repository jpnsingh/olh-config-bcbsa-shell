(function () {
    'use strict';

    module.exports = angular
        .module('bcbsa-shell.configuration', [
            require('./configuration.factory').name,
            require('./configuration.controller').name
        ])
        .config(require('./config.state.config'))
        .config(require('./config.plans.state.config'));
})();
