(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.upload.directives.fileUploadButtonDirective', [])
        .directive('fileUploadButton', UploadButtonDirective);

    UploadButtonDirective.$inject = ['FileUploader', 'NotificationService'];
    function UploadButtonDirective(FileUploader, NotificationService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                fileModel: '=',
                hide: '='
            },
            templateUrl: 'templates/partials/upload/file.upload.button.html',
            link: link
        };

        function link(scope/*, element, attrs, ctrl*/) {
            scope.uploadFile = function (file) {
                if (!file) {
                    return;
                }

                scope.uploading = true;

                FileUploader
                    .uploadFile(file)
                    .then(function (data) {
                        scope.uploading = false;
                        scope.fileModel.src = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                        scope.fileModel.value = data.file.originalFilename;
                    }, function (error) {
                        scope.uploading = false;
                        NotificationService.displayError(error.message);
                    }, function (progress) {
                        scope.uploadProgress = progress;
                    });
            };
        }
    }
})();
