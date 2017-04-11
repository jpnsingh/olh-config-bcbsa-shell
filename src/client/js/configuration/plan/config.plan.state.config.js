'use strict';

export function ConfigPlanStateConfig($stateProvider) {
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
                controller: 'ConfigPlanCtrl',
                controllerAs: 'configPlanCtrl'
            },
            planSetup: {
                name: 'configuration.plan.setup',
                url: '/setup',
                templateUrl: 'templates/partials/configuration/plan/config.plan.setup.html',
                data: {
                    docTitle: 'Configuration | Plan | Setup'
                },
                controller: 'PlanSetupCtrl',
                controllerAs: 'planSetupCtrl'
            },
            planAdditional: {
                name: 'configuration.plan.additional',
                url: '/additional',
                templateUrl: 'templates/partials/configuration/plan/config.plan.additional.html',
                data: {
                    docTitle: 'Configuration | Plan | Additional',
                },
                controller: 'PlanAdditionalCtrl',
                controllerAs: 'planAdditionalCtrl'
            },
            featurePool: {
                name: 'configuration.plan.featurePool',
                url: '/featurePool',
                templateUrl: 'templates/partials/configuration/plan/config.plan.feature.pool.html',
                data: {
                    docTitle: 'Configuration | Plan | Feature Pool',
                },
                controller: 'FeaturePoolCtrl',
                controllerAs: 'featurePoolCtrl'
            },
            featureAssignment: {
                name: 'configuration.plan.featureAssignment',
                url: '/featureAssignment',
                templateUrl: 'templates/partials/configuration/plan/config.plan.feature.assignment.html',
                data: {
                    docTitle: 'Configuration | Plan | Feature Assignment',
                },
                controller: 'FeatureAssignmentCtrl',
                controllerAs: 'featureAssignmentCtrl'
            }
        };
    }
}

ConfigPlanStateConfig.$inject = ['$stateProvider'];
