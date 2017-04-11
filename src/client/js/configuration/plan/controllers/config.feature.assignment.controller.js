(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.controllers.featureAssignmentController', [])
        .controller('FeatureAssignmentCtrl', FeatureAssignmentCtrl);

    FeatureAssignmentCtrl.$inject = ['ConfigService'];
    function FeatureAssignmentCtrl(ConfigService) {
        var vm = this;

        vm.rootConfig = ConfigService.getCachedConfig();
    }
})();
