(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.states', [])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            var root = {
                    name: 'root',
                    url: '/',
                    templateUrl: 'templates/partials/root.html'
                },
                home = {
                    name: 'home',
                    url: '/home',
                    templateUrl: 'templates/partials/home.html'
                },
                about = {
                    name: 'about',
                    url: '/about',
                    templateUrl: 'templates/partials/about.html'
                },
                configuration = {
                    name: 'configuration',
                    url: '/configuration',
                    templateUrl: 'templates/partials/configuration.html',
                    controller: 'ConfigCtrl',
                    controllerAs: 'configCtrl'
                },
                notFound = {
                    name: 'notFound',
                    url: '/404',
                    templateUrl: 'templates/404.html'
                };

            $urlRouterProvider.when('', '/');

            $locationProvider.hashPrefix('');

            $stateProvider
                .state(root)
                .state(home)
                .state(about)
                .state(configuration);
        });
})();
