(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$rootScope', '$timeout', 'ConfigService', 'UserService'];
    function ConfigCtrl($rootScope, $timeout, ConfigService, UserService) {
        var vm = this;

        vm.config = {};

        init();

        vm.config.sidebar = [
            {title: 'Role Management', state: 'configuration.role', active: 'configuration.role'},
            {title: 'User Management', state: 'configuration.user', active: 'configuration.user'},
            {title: 'Plan Management', state: 'configuration.plan.setup', active: 'configuration.plan'},
            {title: 'Reports', state: 'configuration.report', active: 'configuration.report'}
        ];

        vm.config.tabs = [
            {'title': 'Plan Setup', 'state': 'configuration.plan.setup'},
            {'title': 'Plan Additional', 'state': 'configuration.plan.additional'},
            {'title': 'Feature Pool', 'state': 'configuration.plan.featurePool'},
            {'title': 'Feature Assignment', 'state': 'configuration.plan.featureAssignment'}
        ];

        vm.update = function () {
            $rootScope.updatingPlan = true;
            console.log(vm.config);

            $timeout(function () {
                ConfigService
                    .updateConfig(vm.config)
                    .then(function (data) {
                        $rootScope.updatingPlan = false;
                        vm.config = data.config;
                        ConfigService.cacheConfig(vm.config);
                    }, function (error) {
                        $rootScope.updatingPlan = false;
                        vm.error = error;
                    });
            }, 2000);
        };

        function init() {
            vm.loading = true;

            UserService
                .getUserGroups()
                .then(function (data) {
                    vm.userGroups = data.groups;
                    vm.selectedGroup = vm.userGroups[0];

                    ConfigService
                        .getGroupConfig(vm.selectedGroup._id)
                        .then(function (data) {
                            vm.loading = false;
                            angular.extend(vm.config, data.config);
                            ConfigService.cacheConfig(vm.config);
                        }, function (error) {
                            vm.loading = false;
                            vm.error = error;
                        });
                }, function (error) {
                    vm.error = error;
                });
        }
    }
})();
