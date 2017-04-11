'use strict';

import {LoginCtrl} from './login.controller';
import {LogoutCtrl} from './logout.controller';
import {RegisterCtrl} from './register.controller';

module.exports = angular
    .module('bcbsa-shell.auth.controllers', [])
    .controller('LoginCtrl', LoginCtrl)
    .controller('LogoutCtrl', LogoutCtrl)
    .controller('RegisterCtrl', RegisterCtrl);
