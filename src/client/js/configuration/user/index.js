'use strict';

import {ConfigUserStateConfig} from './config.user.state.config';
import {UserService} from './config.user.service';

module.exports = angular
    .module('bcbsa-shell.configuration.user', [
        require('./config.user.factory.js').name,
        require('./config.user.controller.js').name
    ])
    .config(ConfigUserStateConfig)
    .service('UserService', UserService);
