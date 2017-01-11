(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared', [
        require('./directives').name,
        require('./controllers').name
    ]);
})();
