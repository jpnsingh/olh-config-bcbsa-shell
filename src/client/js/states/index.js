'use strict';

import {DefaultStateConfig} from './default.state.config';
import {DefaultStateRun} from './default.state.run';

module.exports = angular
    .module('bcbsa-shell.states', [])
    .config(DefaultStateConfig)
    .run(DefaultStateRun);
