(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.newsFeedFactory', [])
        .factory('NewsFeed', NewsFeedFactory);

    NewsFeedFactory.$inject = [];
    function NewsFeedFactory() {
        return function () {
            this.header = {
                label: 'Feed Header',
                type: 'text',
                placeholder: 'Feed Header',
                value: ''
            };

            this.link = {
                label: 'Feed Link',
                type: 'text',
                placeholder: 'Feed Link',
                value: ''
            };

            this.image = {
                label: 'Feed Image',
                type: 'text',
                placeholder: 'Feed Image',
                value: '',
                src: ''
            };
        };
    }
})();
