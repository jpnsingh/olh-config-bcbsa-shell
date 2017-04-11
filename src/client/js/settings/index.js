'use strict';

import {SettingsStateConfig} from './settings.state.config';
import {AccountsCtrl} from './accounts.controller';
import {ProfileCtrl} from './profile.controller';

module.exports = angular
    .module('bsbsa-shell.settings', ['ui.router'])
    .config(SettingsStateConfig)
    .controller('AccountsCtrl', AccountsCtrl)
    .controller('ProfileCtrl', ProfileCtrl);
