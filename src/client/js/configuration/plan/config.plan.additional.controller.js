(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planAdditionalController', [])
        .controller('PlanAdditionalCtrl', PlanAdditionalCtrl);

    PlanAdditionalCtrl.$inject = ['ConfigFactory', 'FileUploader'];
    function PlanAdditionalCtrl(ConfigFactory, FileUploader) {
        var vm = this;

        vm.rootConfig = ConfigFactory.getCachedConfig();

        vm.planAdditional = {};

        vm.planAdditional = angular.extend(vm.planAdditional, vm.rootConfig.planAdditional);

        vm.uploadFeedImage = function (file, model) {
            if (!file) {
                return;
            }

            vm.uploadingFeedImage = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingFeedImage = false;
                    vm.feedImage = data.file;
                    vm.base64FeedImage = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                    model.value = vm.feedImage.originalFilename;
                    model.src = vm.feedImage.originalFilename;
                }, function (error) {
                    vm.uploadingFeedImage = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadFeedImageProgress = progress;
                });
        };

        vm.uploadInterestImage = function (file, model) {
            if (!file) {
                return;
            }

            vm.uploadingInterestImage = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingInterestImage = false;
                    vm.interestImage = data.file;
                    model.image.value = vm.interestImage.originalFilename;
                    vm.base64InterestImage = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                }, function (error) {
                    vm.uploadingInterestImage = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadInterestImageProgress = progress;
                });
        };

        vm.update = function () {
            vm.updating = true;

            console.log(vm.rootConfig);

            ConfigFactory
                .updateConfig(vm.rootConfig)
                .then(function (data) {
                    vm.updating = false;

                    vm.planAdditional = data.groupConfig.planAdditional;
                }, function (error) {
                    vm.updating = false;

                    vm.error = error;
                });
        };
    }
})();
