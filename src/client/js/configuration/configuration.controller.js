(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.controllers.ConfigurationController', [])
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = [];
    function ConfigCtrl() {
        var vm = this;

        vm.sidebar = [
            {title: 'Role Management', state: 'configuration.role', activeState: 'configuration.role'},
            {title: 'User Management', state: 'configuration.user', activeState: 'configuration.user'},
            {title: 'Plan Management', state: 'configuration.plan.setup', activeState: 'configuration.plan'},
            {title: 'Reports', state: 'configuration.report', activeState: 'configuration.report'}
        ];
    }
})();
