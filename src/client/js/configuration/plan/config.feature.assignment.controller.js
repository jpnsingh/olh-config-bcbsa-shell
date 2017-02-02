(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.featureAssignmentController', [])
        .controller('FeatureAssignmentCtrl', FeatureAssignmentCtrl);

    FeatureAssignmentCtrl.$inject = ['ConfigFactory'];
    function FeatureAssignmentCtrl(ConfigFactory) {
        var vm = this;

        vm.rootConfig = ConfigFactory.getCachedConfig();

        vm.featureAssignment = {};

        vm.featureAssignment = angular.extend(vm.featureAssignment, vm.rootConfig.featureAssignment);
    }
})();
