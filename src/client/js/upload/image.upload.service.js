(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.upload.controller.imageUploadController', [])
        .factory('ImageUploader', ImageUploader);

    ImageUploader.$inject = ['Upload'];
    function ImageUploader(Upload) {
        return {
            uploadFile: uploadFile
        };

        function uploadFile(image) {
            return Upload
                .upload({
                    url: 'api/upload/file',
                    file: image
                }).then(function (response) {
                    return response.data;
                }, function (response) {
                    return 'Error: ' + response.status;
                }, function (event) {
                    return parseInt(100.0 * event.loaded / event.total);
                });
        }
    }
})();
