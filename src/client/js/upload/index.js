'use strict';

import {FileUploaderService} from './file.upload.service';
import {ImageUploadDirective} from './image.upload.directive';

module.exports = angular
    .module('bcbsa-shell.upload', ['ngFileUpload'])
    .service('FileUploaderService', FileUploaderService)
    .directive('imageUpload', ImageUploadDirective);
