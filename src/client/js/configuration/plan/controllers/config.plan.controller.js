(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.controllers.ConfigPlanController', [])
        .controller('ConfigPlanCtrl', ConfigPlanCtrl);

    /* jshint maxparams: 8 */
    ConfigPlanCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$filter', 'ConfigPlan', 'ConfigService', 'UserService', 'NotificationService'];
    function ConfigPlanCtrl($rootScope, $scope, $timeout, $filter, ConfigPlan, ConfigService, UserService, NotificationService) {
        var vm = this;

        init();

        vm.tabs = [
            {title: 'Plan Setup', state: 'configuration.plan.setup', order: 1},
            {title: 'Plan Additional', state: 'configuration.plan.additional', order: 2},
            {title: 'Feature Pool', state: 'configuration.plan.featurePool', order: 3},
            {title: 'Feature Assignment', state: 'configuration.plan.featureAssignment', order: 4}
        ];

        vm.changeGroup = function () {
            initGroupConfig();
        };

        vm.newPlan = function () {
            if (vm.userGroupPresent && !vm.planConfigured) {
                vm.addingPlanConfig = true;
                setupConfig(new ConfigPlan());
            } else {
                $('#addPlanModal').modal('toggle');
                $('#addPlanModal').on('shown.bs.modal', function () {
                    $('#planName').focus();
                });
            }
        };

        vm.addPlan = function () {
            vm.addingPlan = true;

            ConfigService
                .newGroupConfig(vm.plan)
                .then(function (group) {
                    NotificationService.displaySuccess('Plan created successfully.');
                    vm.addingPlan = false;
                    var newUserGroup = {
                        _id: group._id,
                        name: group.name,
                        description: group.description,
                    };

                    vm.userGroups.unshift(newUserGroup);
                    vm.userGroupPresent = true;
                    vm.selectedGroup = vm.userGroups[0];
                    initGroupConfig();

                    $('#addPlanModal').modal('toggle');
                }, function (error) {
                    vm.addingPlan = false;
                    vm.error = error;
                    NotificationService.displayError(error.message);
                });
        };

        vm.inheritFromRoot = function () {
            vm.loadingConfig = true;

            ConfigService
                .getGroupConfig('Root')
                .then(function (groupData) {
                    vm.loadingConfig = false;
                    groupData.config.planSetup.branding.planInfo.value = '';
                    setupConfig(groupData.config);
                    NotificationService.displayInfo('Add a Plan Title and configure accordingly.');
                }, function (error) {
                    vm.loadingConfig = false;
                    vm.error = error;
                });
        };

        vm.updatePlan = function () {
            $rootScope.updatingPlan = true;

            ConfigService
                .updateConfig(vm.config, vm.selectedGroup._id)
                .then(function () {
                    NotificationService.displaySuccess('Plan updated successfully.');
                    $rootScope.updatingPlan = false;
                    vm.addingPlanConfig = false;
                    vm.editingConfig = false;
                }, function (error) {
                    $rootScope.updatingPlan = false;
                    vm.editingConfig = false;
                    vm.addingPlanConfig = false;
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
                    if (vm.userGroups.length) {
                        vm.selectedGroup = vm.userGroups[0];
                        initGroupConfig();
                    } else {
                        vm.userGroupPresent = false;
                        vm.selectedGroup = undefined;
                    }

                    $('#deletePlanModal').modal('toggle');
                }, function (error) {
                    vm.error = error;
                    vm.updating = false;
                    NotificationService.displayError('Error deleting Plan.');
                });
        };

        function setupConfig(config) {
            vm.config = {};

            if (_.isEmpty(config)) {
                vm.planConfigured = false;
                return;
            }

            vm.planConfigured = true;
            angular.extend(vm.config, config);
            ConfigService.cacheConfig(vm.config);

            $timeout(function () {
                $('#planTitle').focus();
            });
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
            vm.userGroups = [];

            UserService
                .getUserGroups()
                .then(function (data) {
                    if (!_.isEmpty(data.groups)) {
                        vm.userGroupPresent = true;
                        vm.userGroups = $filter('orderBy')(data.groups, 'groupId');
                        vm.selectedGroup = vm.userGroups[0];
                        initGroupConfig();
                    } else {
                        vm.userGroupPresent = false;
                    }
                }, function (error) {
                    vm.error = error;
                });
        }

        $scope.$watch('configPlanCtrl.config', function (newVal, oldVal) {
            vm.editingConfig = !_.isEmpty(oldVal) && !_.isEmpty(newVal) && (newVal !== oldVal);
        }, true);
    }
})();