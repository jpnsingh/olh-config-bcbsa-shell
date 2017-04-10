(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.user', [
            require('./config.user.factory.js').name,
            require('./config.user.service.js').name,
            require('./config.user.controller.js').name
        ]).config(require('./config.user.state.config'));
})();
