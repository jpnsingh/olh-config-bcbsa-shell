(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planSetupController', [])
        .controller('PlanSetupCtrl', PlanSetupCtrl);

    PlanSetupCtrl.$inject = ['ConfigService'];
    function PlanSetupCtrl(ConfigService) {
        var vm = this;

        vm.rootConfig = ConfigService.getCachedConfig();

        vm.planSetup = {};

        vm.planSetup = angular.extend(vm.planSetup, vm.rootConfig.planSetup);

        vm.languages = ConfigService.getConfigurableLanguages();
    }
})();
