(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = [];
    function ConfigCtrl() {
        var vm = this;

        vm.sidebar = [
            {title: 'config.sidebar.roleManagementLabel', state: 'configuration.role', activeState: 'configuration.role'},
            {title: 'config.sidebar.userManagementLabel', state: 'configuration.user', activeState: 'configuration.user'},
            {title: 'config.sidebar.planManagementLabel', state: 'configuration.plan.setup', activeState: 'configuration.plan'},
            {title: 'config.sidebar.reportsLabel', state: 'configuration.report', activeState: 'configuration.report'}
        ];
    }
})();
