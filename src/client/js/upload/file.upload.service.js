'use strict';

export class FileUploaderService {
    constructor(Upload) {
        this.Upload = Upload;
    }

    uploadFile(image) {
        return this.Upload
            .upload({url: 'api/upload/file', file: image})
            .then(function (response) {
                return response.data;
            }, function (response) {
                return 'Error: ' + response.status;
            }, function (event) {
                return parseInt(100.0 * event.loaded / event.total);
            });
    }
}

FileUploaderService.$inject = ['Upload'];
