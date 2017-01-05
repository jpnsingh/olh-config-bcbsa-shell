(function () {
    'use strict';

    module.exports = defaultStateConfig;

    defaultStateConfig.$inject = ['$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider', '$stateProvider'];
    function defaultStateConfig($urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider, $stateProvider) {
        var nav = {
                name: 'nav',
                abstract: true,
                templateUrl: 'templates/partials/nav/navbar.html',
                controller: 'NavBarCtrl',
                controllerAs: 'navBarCtrl'
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
            dashboard = {
                name: 'dashboard',
                url: '/',
                docTitle: 'Dashboard',
                parent: 'nav',
                templateUrl: 'templates/partials/dashboard.html'
            },
            about = {
                name: 'about',
                url: '/about',
                docTitle: 'About',
                parent: 'nav',
                templateUrl: 'templates/partials/about.html'
            },
            help = {
                name: 'help',
                url: '/help',
                docTitle: 'Help',
                parent: 'nav',
                templateUrl: 'templates/partials/help.html'
            };

        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        $locationProvider.hashPrefix('');

        $stateProvider
            .state(nav)
            .state(nonav)
            .state(notFound)
            .state(dashboard)
            .state(about)
            .state(help);
    }
})();
