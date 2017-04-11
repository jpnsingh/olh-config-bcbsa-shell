'use strict';

import {auth} from './auth.service';
import {AuthStateConfig} from './auth.state.config';
import {LoginCtrl} from './login.controller';
import {LogoutCtrl} from './logout.controller';
import {RegisterCtrl} from './register.controller';


module.exports = angular
    .module('bcbsa-shell.auth', [])
    .config(AuthStateConfig)
    .service('auth', auth)
    .controller('LoginCtrl', LoginCtrl)
    .controller('LogoutCtrl', LogoutCtrl)
    .controller('RegisterCtrl', RegisterCtrl);
