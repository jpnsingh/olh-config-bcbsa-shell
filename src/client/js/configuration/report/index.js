'use strict';

import {ConfigReportStateConfig} from './config.report.state.config';

module.exports = angular
    .module('bcbsa-shell.configuration.report', [])
    .config(ConfigReportStateConfig);
