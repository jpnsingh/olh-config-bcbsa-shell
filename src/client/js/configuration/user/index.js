(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.user', [
            require('./user.factory').name,
            require('./user.service').name,
            require('./user.controller').name
        ]).config(require('./config.user.state.config'));
})();
