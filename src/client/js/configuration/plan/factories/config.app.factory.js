(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.factories.appFactory', [])
        .factory('App', AppFactory);

    AppFactory.$inject = ['Field'];
    function AppFactory(Field) {
        var App = function () {
            this.displayName = new Field('appDisplayName')
                .type('text')
                .label('Display Name')
                .placeholder('Display Name')
                .value('');

            this.icon = new Field('appIcon')
                .type('image')
                .label('Icon/Image')
                .placeholder('Icon/Image')
                .value('')
                .src('');

            this.appName = new Field('appName')
                .type('text')
                .label('App Name')
                .placeholder('App Name')
                .value('');

            this.appType = new Field('appType')
                .type('text')
                .label('App Type')
                .placeholder('App Type')
                .value('');

            this.appId = new Field('appID')
                .type('text')
                .label('App ID')
                .placeholder('App ID')
                .value('');

            this.appUrl = new Field('appUrl')
                .type('text')
                .label('App Url')
                .placeholder('App Url')
                .value('');

            this.storeUrl = new Field('appStoreUrl')
                .type('text')
                .label('Store Url')
                .placeholder('Store Url')
                .value('');

            this.enabled = new Field('appEnabled')
                .type('checkbox')
                .label('Enabled')
                .value('');
        };

        return App;
    }
})();
