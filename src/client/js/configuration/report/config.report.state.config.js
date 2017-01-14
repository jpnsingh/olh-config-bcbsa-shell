(function () {
    'use strict';

    module.exports = ConfigReportStateConfig;

    ConfigReportStateConfig.$inject = ['$stateProvider'];
    function ConfigReportStateConfig($stateProvider) {
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
})();
