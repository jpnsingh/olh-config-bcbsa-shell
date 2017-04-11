'use strict';

import {DefaultAppConfig} from './default.app.config';
import {DefaultAppRun} from './default.app.run';

module.exports = angular
    .module('bcbsa-shell', [
        'ui.router',
        'pascalprecht.translate',
        require('./shared').name,
        require('./auth').name,
        require('./nav').name,
        require('./configuration').name,
        require('./localization').name,
        require('./upload').name,
        require('./settings').name,
        require('./states').name
    ])
    .config(DefaultAppConfig)
    .run(DefaultAppRun);
