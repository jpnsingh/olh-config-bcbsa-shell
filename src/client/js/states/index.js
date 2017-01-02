(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.states', [])
        .config(require('./defaultStateConfig'))
        .run(require('./defaultStateRun'));
})();
