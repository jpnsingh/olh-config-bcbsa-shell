(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.user', [])
        .config(require('./config.user.state.config'));
})();
