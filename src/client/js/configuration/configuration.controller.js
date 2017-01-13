(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['ConfigFactory'];
    function ConfigCtrl(ConfigFactory) {
        var vm = this;

        vm.loading = true;
        vm.config = {};

        ConfigFactory
            .getDefaultConfig()
            .then(function (data) {
                vm.loading = false;
                angular.extend(vm.config, data.config);
            });
    }
})();
