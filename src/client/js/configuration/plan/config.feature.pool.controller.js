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

        vm.uploadAppImage = function (file, model) {
            if (!file) {
                return;
            }

            vm.uploadingAppImage = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingAppImage = false;
                    vm.appImage = data.file;
                    model.value = vm.appImage.originalFilename;
                    vm.base64AppImage = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                    model.src = vm.base64AppImage;
                }, function (error) {
                    vm.uploadingAppImage = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadAppImageProgress = progress;
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
