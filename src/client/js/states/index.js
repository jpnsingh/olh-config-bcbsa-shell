(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.states', [])
        .config(require('./default.state.config'))
        .run(require('./default.state.run'));
})();
