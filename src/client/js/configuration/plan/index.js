'use strict';

import {ConfigPlanStateConfig} from './config.plan.state.config';

module.exports = angular
    .module('bcsba-shell.configuration.plan', [
        require('./factories').name,
        require('./controllers').name
    ])
    .config(ConfigPlanStateConfig);
