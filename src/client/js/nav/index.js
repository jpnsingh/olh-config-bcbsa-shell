'use strict';

import {NavTopDirective} from './navbar.top.directive';
import {NavBottomDirective} from './navbar.bottom.directive';
import {NavBarCtrl} from './navbar.controller';

module.exports = angular
    .module('bcbsa-shell.navigation', [])
    .controller('NavBarCtrl', NavBarCtrl)
    .directive('navbarTop', NavTopDirective)
    .directive('navbarBottom', NavBottomDirective);
