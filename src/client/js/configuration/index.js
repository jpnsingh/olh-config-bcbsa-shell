'use strict';

import {ConfigStateConfig} from './config.state.config';
import {ConfigService} from './configuration.service';
import {ConfigCtrl} from './configuration.controller';

module.exports = angular
    .module('bcbsa-shell.configuration', [
        require('./role').name,
        require('./user').name,
        require('./plan').name,
        require('./report').name
    ])
    .config(ConfigStateConfig)
    .service('ConfigService', ConfigService)
    .controller('ConfigCtrl', ConfigCtrl);
