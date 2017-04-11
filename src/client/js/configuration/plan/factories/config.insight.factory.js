(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.factories.insightFactory', [])
        .factory('Insight', InsightFactory);

    InsightFactory.$inject = [];
    function InsightFactory() {
        return function () {
            this.header = {
                label: 'Header',
                type: 'text',
                placeholder: 'Insight Header',
                value: ''
            };

            this.url = {
                label: 'URL/API',
                type: 'text',
                placeholder: 'Insight URL/API',
                value: ''
            };
        };
    }
})();
