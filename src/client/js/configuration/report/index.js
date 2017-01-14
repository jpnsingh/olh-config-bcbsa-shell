(function () {
    'use strict';

    module.exports = angular
        .module('bcsba-shell.configuration.reports', [])
        .config(require('./config.report.state.config'));
})();
