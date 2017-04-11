'use strict';

import {ConfigRoleStateConfig} from './config.role.state.config';
import {RoleService} from './config.role.service';

module.exports = angular
    .module('bcbsa-shell.configuration.role', [
        require('./config.role.factory').name,
        require('./config.role.controller').name
    ])
    .config(ConfigRoleStateConfig)
    .service('RoleService', RoleService);
