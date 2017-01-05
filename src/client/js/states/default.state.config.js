(function () {
    'use strict';

    module.exports = defaultStateConfig;

    defaultStateConfig.$inject = ['$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider', '$stateProvider'];
    function defaultStateConfig($urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider, $stateProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider.when('', '/dashboard');
        $urlRouterProvider.otherwise('/404');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state(state().nav)
            .state(state().nonav)
            .state(state().notFound)
            .state(state().dashboard)
            .state(state().about)
            .state(state().help);

        function state() {
            return {
                nav: {
                    name: 'nav',
                    abstract: true,
                    templateUrl: 'templates/partials/nav/navbar.html',
                    controller: 'NavBarCtrl',
                    controllerAs: 'navBarCtrl'
                },
                nonav: {
                    name: 'nonav',
                    abstract: true,
                    templateUrl: 'templates/partials/nav/nonav.html'
                },
                notFound: {
                    name: 'notFound',
                    url: '/404',
                    parent: 'nonav',
                    templateUrl: 'templates/404.html'
                },
                dashboard: {
                    name: 'dashboard',
                    url: '/dashboard',
                    docTitle: 'Dashboard',
                    parent: 'nav',
                    templateUrl: 'templates/partials/dashboard.html'
                },
                about: {
                    name: 'about',
                    url: '/about',
                    docTitle: 'About',
                    parent: 'nav',
                    templateUrl: 'templates/partials/about.html'
                },
                help: {
                    name: 'help',
                    url: '/help',
                    docTitle: 'Help',
                    parent: 'nav',
                    templateUrl: 'templates/partials/help.html'
                }
            };
        }
    }
})();
