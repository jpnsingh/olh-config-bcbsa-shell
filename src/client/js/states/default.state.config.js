'use strict';

export function DefaultStateConfig($urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider, $stateProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider.when('', '/dashboard');
    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(true);

    $stateProvider
        .state(states().nav)
        .state(states().nonav)
        .state(states().notFound)
        .state(states().dashboard)
        .state(states().about)
        .state(states().help);

    function states() {
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
                parent: 'nav',
                templateUrl: 'templates/partials/dashboard.html',
                data: {
                    docTitle: 'Dashboard'
                }
            },
            about: {
                name: 'about',
                url: '/about',
                parent: 'nav',
                templateUrl: 'templates/partials/about.html',
                data: {
                    docTitle: 'About'
                }
            },
            help: {
                name: 'help',
                url: '/help',
                parent: 'nav',
                templateUrl: 'templates/partials/help.html',
                data: {
                    docTitle: 'Help'
                }
            }
        };
    }
}

DefaultStateConfig.$inject = ['$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider', '$stateProvider'];
