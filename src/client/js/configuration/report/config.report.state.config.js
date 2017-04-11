'use strict';

export function ConfigReportStateConfig($stateProvider) {
    $stateProvider
        .state(states().report);

    function states() {
        return {
            report: {
                name: 'configuration.report',
                url: '/report',
                templateUrl: 'templates/partials/configuration/config.report.html',
                data: {
                    docTitle: 'Configuration | Reports'
                }
            }
        };
    }
}

ConfigReportStateConfig.$inject = ['$stateProvider'];
