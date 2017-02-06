(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.factories', [
        require('./config.plan.factory').name,
        require('./config.newsFeed.factory').name,
        require('./config.interest.factory').name,
        require('./config.insight.factory').name,
        require('./config.app.factory').name
    ]);
})();