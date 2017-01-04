(function () {
    'use strict';

    module.exports = configStateConfig;

    configStateConfig.$inject = ['$stateProvider'];
    function configStateConfig($stateProvider) {
        var configuration = {
                name: 'configuration',
                url: '/configuration',
                abstract: true,
                parent: 'nav',
                templateUrl: 'templates/partials/configuration/configuration.html',
                controller: 'ConfigCtrl',
                controllerAs: 'configCtrl'
            },
            planSetup = {
                name: 'configuration.planSetup',
                url: '/planSetup',
                docTitle: 'Configuration | Plan Setup',
                templateUrl: 'templates/partials/configuration/plan.setup.html'
            },
            planAdditional = {
                name: 'configuration.planAdditional',
                url: '/planAdditional',
                docTitle: 'Configuration | Plan Additional',
                templateUrl: 'templates/partials/configuration/plan.additional.html'
            },
            featurePool = {
                name: 'configuration.featurePool',
                url: '/featurePool',
                docTitle: 'Configuration | Feature Pool',
                templateUrl: 'templates/partials/configuration/feature.pool.html'
            },
            featureAssignment = {
                name: 'configuration.featureAssignment',
                url: '/featureAssignment',
                docTitle: 'Configuration | Feature Assignment',
                templateUrl: 'templates/partials/configuration/feature.assignment.html'
            };

        $stateProvider
            .state(planSetup)
            .state(planAdditional)
            .state(featurePool)
            .state(featureAssignment)
            .state(configuration);
    }
})();
