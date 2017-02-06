(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.plan', [
            require('./factories').name,
            require('./controllers').name
        ])
        .config(require('./config.plan.state.config.js'));
})();
