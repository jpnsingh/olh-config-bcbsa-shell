(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.appFactory', [])
        .factory('App', AppFactory);

    AppFactory.$inject = [];
    function AppFactory() {
        return function () {
            this.displayName = {
                label: '',
                type: 'text',
                placeholder: 'Display Name',
                value: ''
            };

            this.icon = {
                label: '',
                type: 'image',
                placeholder: 'Icon/Image',
                value: '',
                src: ''
            };

            this.appName = {
                label: '',
                type: 'text',
                placeholder: 'App Name',
                value: ''
            };

            this.appType = {
                label: 'App Type',
                type: 'text',
                placeholder: 'App Type',
                value: ''
            };

            this.appId = {
                label: 'App ID',
                type: 'text',
                placeholder: 'App ID',
                value: ''
            };

            this.appUrl = {
                label: 'App URL',
                type: 'text',
                placeholder: 'App URL',
                value: ''
            };

            this.storeUrl = {
                label: 'Store URL',
                type: 'text',
                placeholder: 'Store URL',
                value: ''
            };

            this.enabled = {
                label: 'Enabled',
                type: 'checkbox',
                placeholder: 'Enabled',
                value: false
            };
        };
    }
})();
