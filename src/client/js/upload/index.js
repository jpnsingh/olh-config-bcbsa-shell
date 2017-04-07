'use strict';

import {FileUploaderService} from './file.upload.service';

module.exports = angular
    .module('bcbsa-shell.upload', [
        'ngFileUpload',
        require('./image.upload.directive.js').name
    ])
    .service('FileUploader', FileUploaderService);
