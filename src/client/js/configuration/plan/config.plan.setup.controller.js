(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planSetupController', [])
        .controller('PlanSetupCtrl', PlanSetupCtrl);

    PlanSetupCtrl.$inject = ['ConfigFactory'];
    function PlanSetupCtrl(ConfigFactory) {
        var vm = this;

        vm.planSetup = {};

        vm.planSetup = angular.extend(vm.planSetup, ConfigFactory.getCachedConfig().planSetup);

        vm.languages = ConfigFactory.getConfigurableLanguages();

        vm.applyColorTheme = function () {
            console.log(vm.planSetup);
        };
    }
})();
