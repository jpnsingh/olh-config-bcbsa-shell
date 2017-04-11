'use strict';

export function ImageUploadDirective(FileUploaderService, NotificationService) {
    const directiveDefinitionObject = {
        restrict: 'EA',
        replace: true,
        scope: {
            fileModel: '=',
            hide: '='
        },
        templateUrl: 'templates/partials/upload/image.upload.html'
    };

    directiveDefinitionObject.link = (scope/*, element, attrs, ctrl*/) => {
        scope.uploadImage = function (file) {
            if (!file) {
                return;
            }

            scope.uploading = true;

            FileUploaderService
                .uploadFile(file)
                .then(function (data) {
                    scope.uploading = false;
                    scope.fileModel.src = `data:${data.file.headers['content-type']};base64,${data.file.base64String}`;
                    scope.fileModel.value = data.file.originalFilename;
                }, function (error) {
                    scope.uploading = false;
                    NotificationService.displayError(error.message);
                }, function (progress) {
                    scope.uploadProgress = progress;
                });
        };
    };

    return directiveDefinitionObject;
}

ImageUploadDirective.$inject = ['FileUploaderService', 'NotificationService'];
