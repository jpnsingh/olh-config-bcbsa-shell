(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planAdditionalController', [])
        .controller('PlanAdditionalCtrl', PlanAdditionalCtrl);

    PlanAdditionalCtrl.$inject = ['ConfigFactory', 'FileUploader', 'NewsFeed', 'Interest', 'Insight'];
    function PlanAdditionalCtrl(ConfigFactory, FileUploader, NewsFeed, Interest, Insight) {
        var vm = this;

        vm.rootConfig = ConfigFactory.getCachedConfig();

        vm.planAdditional = {};

        vm.planAdditional = angular.extend(vm.planAdditional, vm.rootConfig.planAdditional);

        init();

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

        vm.addNewsFeed = function () {
            vm.planAdditional.newsFeed.list.unshift(new NewsFeed());
            initNewsFeed();
        };

        vm.deleteNewsFeed = function () {
            _.remove(vm.planAdditional.newsFeed.list, vm.selectedNewsFeed);
            initNewsFeed();
        };

        vm.addInterest = function () {
            vm.planAdditional.interest.list.unshift(new Interest());
            initInterest();
        };

        vm.deleteInterest = function () {
            _.remove(vm.planAdditional.interest.list, vm.selectedInterest);
            initInterest();
        };

        vm.addInsight = function () {
            vm.planAdditional.insight.list.unshift(new Insight());
            initInsight();
        };

        vm.deleteInsight = function () {
            _.remove(vm.planAdditional.insight.list, vm.selectedInsight);
            initInsight();
        };

        vm.update = function () {
            vm.updating = true;

            ConfigFactory
                .updateConfig(vm.rootConfig)
                .then(function (data) {
                    vm.updating = false;
                    vm.planAdditional = data.config.planAdditional;
                    init();
                }, function (error) {
                    vm.updating = false;
                    vm.error = error;
                });
        };

        function init() {
            initNewsFeed();
            initInterest();
            initInsight();
        }

        function initNewsFeed() {
            vm.selectedNewsFeed = vm.planAdditional.newsFeed.list[0];
        }

        function initInterest() {
            vm.selectedInterest = vm.planAdditional.interest.list[0];
        }

        function initInsight() {
            vm.selectedInsight = vm.planAdditional.insight.list[0];
        }
    }
})();
