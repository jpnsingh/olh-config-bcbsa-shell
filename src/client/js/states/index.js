(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.states', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/partials/home.html'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'templates/partials/about.html'
                });
        });
})();
