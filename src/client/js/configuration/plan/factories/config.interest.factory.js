(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.factories.interestFactory', [])
        .factory('Interest', InterestFactory);

    InterestFactory.$inject = [];
    function InterestFactory() {
        return function () {
            this.header = {
                label: 'Header',
                type: 'text',
                placeholder: 'Interest Header',
                value: ''
            };

            this.description = {
                label: 'Description',
                type: 'text',
                placeholder: 'Interest Description',
                value: ''
            };

            this.image = {
                label: 'Image',
                type: 'image',
                placeholder: 'Interest Image',
                value: '',
                src: ''
            };
        };
    }
})();
