(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planSetupController', [])
        .controller('PlanSetupCtrl', PlanSetupCtrl);

    PlanSetupCtrl.$inject = ['ConfigFactory', 'ImageUploader'];
    function PlanSetupCtrl(ConfigFactory, ImageUploader) {
        var vm = this;

        vm.planSetup = {};

        vm.planSetup = angular.extend(vm.planSetup, ConfigFactory.getCachedConfig().planSetup);

        vm.languages = ConfigFactory.getConfigurableLanguages();

        vm.applyColorTheme = function () {
            console.log(vm.planSetup);
        };

        vm.upload = function (file) {
            if (!file) {
                return;
            }

            vm.uploading = true;
            vm.file = file;
            ImageUploader
                .uploadImage(file)
                .then(function (data) {
                    vm.uploading = false;
                    console.log(data);
                }, function (error) {
                    vm.uploading = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadProgress = progress;
                });
        };
    }
})();
