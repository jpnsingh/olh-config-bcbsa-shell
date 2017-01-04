(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings', [
        require('./controllers').name
    ]).config(require('./settings.state.config'));
})();
