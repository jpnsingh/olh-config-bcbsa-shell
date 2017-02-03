(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$rootScope', 'ConfigPlan', 'ConfigService', 'UserService', 'NotificationService'];
    function ConfigCtrl($rootScope, ConfigPlan, ConfigService, UserService, NotificationService) {
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

        vm.changeGroup = function () {
            initGroupConfig();
        };

        vm.addPlan = function () {
            vm.adding = true;

            ConfigService
                .newGroupConfig(vm.newPlan)
                .then(function (group) {
                    NotificationService.displaySuccess('Plan created successfully.');
                    var newUserGroup = {
                        _id: group._id,
                        name: group.name,
                        description: group.description,
                    };

                    vm.adding = false;

                    vm.userGroups.unshift(newUserGroup);
                    vm.selectedGroup = vm.userGroups[0];

                    initGroupConfig();

                    $('#addPlan').modal('toggle');
                }, function (error) {
                    vm.adding = false;
                    vm.error = error;
                    NotificationService.displayError('Error creating Plan.');
                });
        };

        vm.updatePlan = function () {
            $rootScope.updatingPlan = true;

            ConfigService
                .updateConfig(vm.config, vm.selectedGroup._id)
                .then(function (groupData) {
                    NotificationService.displaySuccess('Plan updated successfully.');
                    $rootScope.updatingPlan = false;
                    setupConfig(groupData.config);
                }, function (error) {
                    $rootScope.updatingPlan = false;
                    vm.error = error;
                    NotificationService.displayError('Error updating plan.');
                });
        };

        vm.deletePlan = function () {
            vm.updating = true;

            ConfigService
                .deleteGroupConfig(vm.selectedGroup._id)
                .then(function () {
                    NotificationService.displaySuccess('Plan deleted successfully.');
                    vm.updating = false;
                    _.remove(vm.userGroups, vm.selectedGroup);
                }, function (error) {
                    vm.error = error;
                    vm.updating = false;
                    NotificationService.displayError('Error deleting Plan.');
                });
        };

        function setupConfig(config) {
            if (_.isEmpty(config)) {
                vm.planConfigured = false;
                return;
            }

            vm.planConfigured = true;
            angular.extend(vm.config, config);
            ConfigService.cacheConfig(vm.config);
        }

        function initGroupConfig() {
            vm.loadingConfig = true;

            ConfigService
                .getGroupConfig(vm.selectedGroup._id)
                .then(function (groupData) {
                    vm.loadingConfig = false;
                    setupConfig(groupData.config);
                }, function (error) {
                    vm.loadingConfig = false;
                    vm.error = error;
                });
        }

        function init() {
            UserService
                .getUserGroups()
                .then(function (data) {
                    vm.userGroups = data.groups;
                    vm.selectedGroup = vm.userGroups[0];
                    initGroupConfig();
                }, function (error) {
                    vm.error = error;
                });
        }
    }
})();
