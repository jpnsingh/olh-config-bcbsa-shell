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

        vm.update = function () {
            vm.updating = true;

            ConfigFactory
                .updateConfig(vm.rootConfig)
                .then(function (data) {
                    vm.updating = false;

                    vm.featureAssignment = data.groupConfig.featureAssignment;
                }, function (error) {
                    vm.updating = false;

                    vm.error = error;
                });
        };
    }
})();
