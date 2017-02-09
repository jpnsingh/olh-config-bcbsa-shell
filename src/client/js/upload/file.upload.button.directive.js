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
            link: function ($scope/*, element, attrs, ctrl*/) {
                $scope.test = function () {
                    console.log('Test Function');
                };

                $scope.uploadFile = function (file) {
                    if (!file) {
                        return;
                    }

                    $scope.uploading = true;

                    FileUploader
                        .uploadFile(file)
                        .then(function (data) {
                            $scope.uploading = false;
                            $scope.uploadModel = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                        }, function (error) {
                            $scope.uploading = false;
                            NotificationService.displayError(error.message);
                        }, function (progress) {
                            $scope.uploadProgress = progress;
                        });
                };
            }
        };
    }
})();
