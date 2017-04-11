'use strict';

export class ConfigCtrl {
    constructor() {
        this.init();
    }

    init() {
        this.sidebar = [
            {title: 'config.sidebar.roleManagementLabel', state: 'configuration.role', activeState: 'configuration.role'},
            {title: 'config.sidebar.userManagementLabel', state: 'configuration.user', activeState: 'configuration.user'},
            {title: 'config.sidebar.planManagementLabel', state: 'configuration.plan.setup', activeState: 'configuration.plan'},
            {title: 'config.sidebar.reportsLabel', state: 'configuration.report', activeState: 'configuration.report'}
        ];
    }
}

ConfigCtrl.$inject = [];