(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.featurePoolCtrlController', [])
        .controller('FeaturePoolCtrl', FeaturePoolCtrl);

    FeaturePoolCtrl.$inject = ['ConfigFactory', 'FileUploader'];
    function FeaturePoolCtrl(ConfigFactory, FileUploader) {
        var vm = this;

        vm.rootConfig = ConfigFactory.getCachedConfig();

        vm.featurePool = {};

        vm.featurePool = angular.extend(vm.featurePool, vm.rootConfig.featurePool);

        vm.uploadAppIcon = function (file, model) {
            if (!file) {
                return;
            }

            vm.uploadingFeedImage = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingFeedImage = false;
                    vm.feedImage = data.file;
                    model.image.value = vm.feedImage.originalFilename;
                    vm.base64FeedImage = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                }, function (error) {
                    vm.uploadingFeedImage = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadFeedImageProgress = progress;
                });
        };

        vm.update = function () {
            vm.updating = true;

            console.log(vm.rootConfig);

            ConfigFactory
                .updateConfig(vm.rootConfig)
                .then(function (data) {
                    vm.updating = false;

                    vm.featurePool = data.groupConfig.featurePool;
                }, function (error) {
                    vm.updating = false;

                    vm.error = error;
                });
        };
    }
})();
