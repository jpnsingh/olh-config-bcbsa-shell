'use strict';

import {FieldFactory} from './field.factory.js';
import {NotificationService} from './notification.service';
import {FileUploaderService} from './file.upload.service';
import {LoadingSpinnerDirective} from './loading.spinner.directive';
import {ImageUploadDirective} from './image.upload.directive';
import {ImagePreviewDirective} from './image.preview.directive';
import {ImageClearDirective} from './image.clear.btn.directive';

module.exports = angular
    .module('bcbsa-shell.shared', ['ngFileUpload'])
    .factory('Field', FieldFactory)
    .service('NotificationService', NotificationService)
    .service('FileUploaderService', FileUploaderService)
    .directive('imageUpload', ImageUploadDirective)
    .directive('loadingSpinner', LoadingSpinnerDirective)
    .directive('imagePreview', ImagePreviewDirective)
    .directive('imageClear', ImageClearDirective);
