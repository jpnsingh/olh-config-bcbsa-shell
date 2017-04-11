'use strict';

import {ConfigUserStateConfig} from './config.user.state.config';

module.exports = angular
    .module('bcsba-shell.configuration.user', [
        require('./config.user.factory.js').name,
        require('./config.user.service.js').name,
        require('./config.user.controller.js').name
    ]).config(ConfigUserStateConfig);
