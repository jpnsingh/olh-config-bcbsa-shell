(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.featurePoolCtrlController', [])
        .controller('FeaturePoolCtrl', FeaturePoolCtrl);

    FeaturePoolCtrl.$inject = ['ConfigFactory', 'FileUploader', 'App'];
    function FeaturePoolCtrl(ConfigFactory, FileUploader, App) {
        var vm = this;

        vm.rootConfig = ConfigFactory.getCachedConfig();

        vm.featurePool = {};

        vm.featurePool = angular.extend(vm.featurePool, vm.rootConfig.featurePool);

        init();

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

        vm.addApp = function () {
            vm.featurePool.appPool.unshift(new App());
            init();
        };

        vm.deleteApp = function () {
            _.remove(vm.featurePool.appPool, vm.selected);
            init();
        };

        function init() {
            vm.selected = vm.featurePool.appPool[0];
        }
    }
})();
