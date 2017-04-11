'use strict';

import {auth} from './auth.service';

module.exports = angular
    .module('bcbsa-shell.auth.services', [])
    .service('auth', auth);
