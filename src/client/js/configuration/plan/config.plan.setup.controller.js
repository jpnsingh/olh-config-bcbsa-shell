(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planSetupController', [])
        .controller('PlanSetupCtrl', PlanSetupCtrl);

    PlanSetupCtrl.$inject = ['ConfigFactory', 'FileUploader'];
    function PlanSetupCtrl(ConfigFactory, FileUploader) {
        var vm = this;

        vm.planSetup = {};

        vm.planSetup = angular.extend(vm.planSetup, ConfigFactory.getCachedConfig().planSetup);

        vm.languages = ConfigFactory.getConfigurableLanguages();

        vm.applyColorTheme = function () {
            console.log(vm.planSetup);
        };

        vm.uploadLogo = function (file) {
            if (!file) {
                return;
            }

            vm.uploadingLogo = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingLogo = false;
                    vm.base64Logo = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                }, function (error) {
                    vm.uploadingLogo = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadLogoProgress = progress;
                });
        };

        vm.uploadBackgroundImage = function (file) {
            if (!file) {
                return;
            }

            vm.uploadingBackgroundImage = true;

            FileUploader
                .uploadFile(file)
                .then(function (data) {
                    vm.uploadingBackgroundImage = false;
                    vm.base64BackgroundImage = 'data:' + data.file.headers['content-type'] + ';base64,' + data.file.base64String;
                }, function (error) {
                    vm.uploadingBackgroundImage = false;
                    console.log(error);
                }, function (progress) {
                    vm.uploadBackgroundImageProgress = progress;
                });
        };
    }
})();
