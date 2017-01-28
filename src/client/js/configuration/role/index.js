(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.role', [
            require('./role.factory').name,
            require('./role.controller').name
        ]).config(require('./config.role.state.config'));
})();
