(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared', [
        require('./factories').name,
        require('./services').name,
        require('./directives').name,
        require('./controllers').name
    ]);
})();
