(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.featurePoolController', [])
        .controller('FeaturePoolCtrl', FeaturePoolCtrl);

    FeaturePoolCtrl.$inject = ['ConfigService', 'App'];
    function FeaturePoolCtrl(ConfigService, App) {
        var vm = this;

        init();

        vm.addApp = function () {
            vm.featurePool.appPool.unshift(new App());
            init();
        };

        vm.deleteApp = function () {
            _.remove(vm.featurePool.appPool, vm.selected);
            init();
        };

        function init() {
            vm.featurePool = {};
            vm.featurePool = angular.extend(vm.featurePool, ConfigService.getCachedConfig().featurePool);

            vm.selected = vm.featurePool.appPool[0];
        }
    }
})();
