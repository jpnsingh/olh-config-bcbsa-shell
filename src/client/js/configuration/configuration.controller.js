(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['ConfigFactory'];
    function ConfigCtrl(ConfigFactory) {
        var vm = this;

        vm.loading = true;
        vm.config = {};
        vm.config.tabs = configTabs();

        function configTabs() {
            return [
                {title: 'Plan Setup', state: 'configuration.planSetup'},
                {title: 'Plan Additional', state: 'configuration.planAdditional'},
                {title: 'Feature Pool', state: 'configuration.featurePool'},
                {title: 'Feature Assignment', state: 'configuration.featureAssignment'}
            ];
        }

        ConfigFactory
            .getDefaultConfig()
            .then(function (data) {
                vm.loading = false;
                vm.config.data = data;
            });
    }
})();
