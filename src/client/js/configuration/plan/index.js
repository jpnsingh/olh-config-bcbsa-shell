'use strict';

import {ConfigPlanStateConfig} from './config.plan.state.config';

module.exports = angular
    .module('bcbsa-shell.configuration.plan', [
        require('./factories').name,
        require('./controllers').name
    ])
    .config(ConfigPlanStateConfig);
