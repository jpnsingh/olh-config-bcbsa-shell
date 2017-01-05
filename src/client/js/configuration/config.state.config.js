(function () {
    'use strict';

    module.exports = ConfigStateConfig;

    ConfigStateConfig.$inject = ['$stateProvider'];
    function ConfigStateConfig($stateProvider) {
        $stateProvider
            .state(states().configuration)
            .state(states().planSetup)
            .state(states().planAdditional)
            .state(states().featurePool)
            .state(states().featureAssignment);

        function states() {
            return {
                configuration: {
                    name: 'configuration',
                    url: '/configuration',
                    abstract: true,
                    parent: 'nav',
                    templateUrl: 'templates/partials/configuration/configuration.html',
                    controller: 'ConfigCtrl',
                    controllerAs: 'configCtrl'
                },
                planSetup: {
                    name: 'configuration.planSetup',
                    url: '/planSetup',
                    templateUrl: 'templates/partials/configuration/plan.setup.html',
                    data: {
                        docTitle: 'Configuration | Plan Setup'
                    }
                },
                planAdditional: {
                    name: 'configuration.planAdditional',
                    url: '/planAdditional',
                    templateUrl: 'templates/partials/configuration/plan.additional.html',
                    data: {
                        docTitle: 'Configuration | Plan Additional',
                    }
                },
                featurePool: {
                    name: 'configuration.featurePool',
                    url: '/featurePool',
                    templateUrl: 'templates/partials/configuration/feature.pool.html',
                    data: {
                        docTitle: 'Configuration | Feature Pool',
                    }
                },
                featureAssignment: {
                    name: 'configuration.featureAssignment',
                    url: '/featureAssignment',
                    templateUrl: 'templates/partials/configuration/feature.assignment.html',
                    data: {
                        docTitle: 'Configuration | Feature Assignment',
                    }
                }
            };
        }
    }
})();
