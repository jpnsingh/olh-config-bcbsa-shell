'use strict';

import {LoadingSpinnerDirective} from './loading.spinner.directive';
import {ImagePreviewDirective} from './image.preview.directive';
import {ImageClearDirective} from './image.clear.btn.directive';

module.exports = angular
    .module('bcbsa-shell.shared.directives', [])
    .directive('loadingSpinner', LoadingSpinnerDirective)
    .directive('imagePreview', ImagePreviewDirective)
    .directive('imageClear', ImageClearDirective);
