(function () {
    'use strict';

    module.exports = ConfigPlansStateConfig;

    ConfigPlansStateConfig.$inject = ['$stateProvider'];
    function ConfigPlansStateConfig($stateProvider) {
        $stateProvider
            .state(states().plan)
            .state(states().planSetup)
            .state(states().planAdditional)
            .state(states().featurePool)
            .state(states().featureAssignment);

        function states() {
            return {
                plan: {
                    name: 'configuration.plan',
                    url: '/plan',
                    abstract: true,
                    templateUrl: 'templates/partials/configuration/config.plan.html',
                },
                planSetup: {
                    name: 'configuration.plan.setup',
                    url: '/setup',
                    templateUrl: 'templates/partials/configuration/plan/plan.setup.html',
                    data: {
                        docTitle: 'Configuration | Plan | Setup'
                    }
                },
                planAdditional: {
                    name: 'configuration.plan.additional',
                    url: '/additional',
                    templateUrl: 'templates/partials/configuration/plan/plan.additional.html',
                    data: {
                        docTitle: 'Configuration | Plan | Additional',
                    }
                },
                featurePool: {
                    name: 'configuration.plan.featurePool',
                    url: '/featurePool',
                    templateUrl: 'templates/partials/configuration/plan/feature.pool.html',
                    data: {
                        docTitle: 'Configuration | Plan | Feature Pool',
                    }
                },
                featureAssignment: {
                    name: 'configuration.plan.featureAssignment',
                    url: '/featureAssignment',
                    templateUrl: 'templates/partials/configuration/plan/feature.assignment.html',
                    data: {
                        docTitle: 'Configuration | Plan | Feature Assignment',
                    }
                }
            };
        }
    }
})();
