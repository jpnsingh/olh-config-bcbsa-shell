(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth', [
        require('./services').name,
        require('./controllers').name
    ]).config(require('./auth.state.config'));
})();
