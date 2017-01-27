(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.interestFactory', [])
        .factory('Interest', InterestFactory);

    InterestFactory.$inject = [];
    function InterestFactory() {
        return function () {
            this.header = {
                label: 'Interest Header',
                type: 'text',
                placeholder: 'Interest Header',
                value: ''
            };

            this.description = {
                label: 'Interest Link',
                type: 'text',
                placeholder: 'Interest Link',
                value: ''
            };

            this.image = {
                label: 'Interest Image',
                type: 'text',
                placeholder: 'Interest Image',
                value: '',
                src: ''
            };
        };
    }
})();
