(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$rootScope', '$timeout', 'ConfigPlan', 'ConfigService', 'UserService'];
    function ConfigCtrl($rootScope, $timeout, ConfigPlan, ConfigService, UserService) {
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
            {title: 'Plan Setup', state: 'configuration.plan.setup'},
            {title: 'Plan Additional', state: 'configuration.plan.additional'},
            {title: 'Feature Pool', state: 'configuration.plan.featurePool'},
            {title: 'Feature Assignment', state: 'configuration.plan.featureAssignment'}
        ];

        vm.initGroupConfig = function () {
            vm.loadingConfig = true;

            $timeout(function () {
                ConfigService
                    .getGroupConfig(vm.selectedGroup._id)
                    .then(function (groupData) {
                        vm.loadingConfig = false;
                        vm.groupId = groupData._id;
                        setupConfig(groupData.config);
                    }, function (error) {
                        vm.loadingConfig = false;
                        vm.error = error;
                    });
            }, 500);
        };

        vm.addPlan = function () {
            vm.userGroups.unshift({_id: '', name: '', description: ''});
            vm.selectedGroup = vm.userGroups[0];
            setupConfig(new ConfigPlan());
        };

        vm.updatePlan = function () {
            $rootScope.updatingPlan = true;
            console.log(vm.config);

            $timeout(function () {
                ConfigService
                    .updateConfig(vm.config, vm.groupId)
                    .then(function (groupData) {
                        $rootScope.updatingPlan = false;
                        setupConfig(groupData.config);
                    }, function (error) {
                        $rootScope.updatingPlan = false;
                        vm.error = error;
                    });
            }, 2000);
        };

        vm.deletePlan = function () {

        };

        function setupConfig(config) {
            if (_.isEmpty(config)) {
                vm.planConfigured = false;
                return;
            }

            angular.extend(vm.config, config);
            ConfigService.cacheConfig(vm.config);
            vm.planConfigured = true;
        }

        function init() {
            UserService
                .getUserGroups()
                .then(function (data) {
                    vm.userGroups = data.groups;
                    vm.selectedGroup = vm.userGroups[0];
                    vm.initGroupConfig();
                }, function (error) {
                    vm.error = error;
                });
        }
    }
})();
