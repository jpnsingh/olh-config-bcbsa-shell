'use strict';

import {LanguageService} from './language.service';
import {LanguageInterceptor} from './language.interceptor';

module.exports = angular.module('bcbsa-shell.localization', [])
    .service('languageService', LanguageService)
    .service('languageInterceptor', LanguageInterceptor);
