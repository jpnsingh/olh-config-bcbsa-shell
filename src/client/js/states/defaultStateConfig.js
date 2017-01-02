(function () {
    'use strict';

    module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider) {
        var nav = {
                name: 'nav',
                abstract: true,
                templateUrl: 'templates/partials/nav/navbar.html'
            },
            nonav = {
                name: 'nonav',
                abstract: true,
                templateUrl: 'templates/partials/nav/nonav.html'
            },
            notFound = {
                name: 'notFound',
                url: '/404',
                parent: 'nonav',
                templateUrl: 'templates/404.html'
            },
            root = {
                name: 'root',
                url: '/',
                parent: 'nav',
                templateUrl: 'templates/partials/root.html'
            },
            about = {
                name: 'about',
                url: '/about',
                parent: 'nav',
                templateUrl: 'templates/partials/about.html'
            },
            help = {
                name: 'help',
                url: '/help',
                parent: 'nav',
                templateUrl: 'templates/partials/help.html'
            };

        $urlRouterProvider.when('', '/');

        $locationProvider.hashPrefix('');

        $stateProvider
            .state(nav)
            .state(nonav)
            .state(notFound)
            .state(root)
            .state(about)
            .state(help);
    };
})();
