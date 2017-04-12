'use strict';

import {FieldFactory} from './field.factory.js';
import {NotificationService} from './notification.service';
import {LoadingSpinnerDirective} from './loading.spinner.directive';
import {ImagePreviewDirective} from './image.preview.directive';
import {ImageClearDirective} from './image.clear.btn.directive';

module.exports = angular
    .module('bcbsa-shell.shared', [])
    .factory('Field', FieldFactory)
    .service('NotificationService', NotificationService)
    .directive('loadingSpinner', LoadingSpinnerDirective)
    .directive('imagePreview', ImagePreviewDirective)
    .directive('imageClear', ImageClearDirective);
