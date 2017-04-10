'use strict';

import {NotificationService} from './notification.service';

module.exports = angular
    .module('bcbsa-shell.shared.services', [])
    .service('NotificationService', NotificationService);
