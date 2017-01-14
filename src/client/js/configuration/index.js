(function () {
    'use strict';

    module.exports = angular
        .module('bcbsa-shell.configuration', [
            require('./role').name,
            require('./user').name,
            require('./plan').name,
            require('./report').name,
            require('./configuration.factory').name,
            require('./configuration.controller').name
        ])
        .config(require('./config.state.config'));
})();
