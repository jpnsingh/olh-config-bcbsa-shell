'use strict';

import {ConfigRoleStateConfig} from './config.role.state.config';

module.exports = angular
    .module('bcsba-shell.configuration.role', [
        require('./config.role.factory').name,
        require('./config.role.service').name,
        require('./config.role.controller').name
    ]).config(ConfigRoleStateConfig);
