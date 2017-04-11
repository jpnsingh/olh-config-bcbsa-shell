(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.factories.newsFeedFactory', [])
        .factory('NewsFeed', NewsFeedFactory);

    NewsFeedFactory.$inject = [];
    function NewsFeedFactory() {
        return function () {
            this.header = {
                label: 'Header',
                type: 'text',
                placeholder: 'Feed Header',
                value: ''
            };

            this.link = {
                label: 'Link',
                type: 'text',
                placeholder: 'Feed Link',
                value: ''
            };

            this.image = {
                label: 'Image',
                type: 'image',
                placeholder: 'Feed Image',
                value: '',
                src: ''
            };
        };
    }
})();
