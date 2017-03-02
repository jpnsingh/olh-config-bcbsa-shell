(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.controllers.planAdditionalController', [])
        .controller('PlanAdditionalCtrl', PlanAdditionalCtrl);

    PlanAdditionalCtrl.$inject = ['ConfigService', 'FileUploader', 'NewsFeed', 'Insight', 'NotificationService'];
    function PlanAdditionalCtrl(ConfigService, FileUploader, NewsFeed, Insight, NotificationService) {
        var vm = this;

        init();

        vm.addNewsFeed = function () {
            vm.planAdditional.newsFeed.list.unshift(new NewsFeed());
            initNewsFeed();
        };

        vm.deleteNewsFeed = function () {
            _.remove(vm.planAdditional.newsFeed.list, vm.selectedNewsFeed);
            initNewsFeed();
        };

        vm.addInsight = function () {
            vm.planAdditional.insight.list.unshift(new Insight());
            initInsight();
        };

        vm.deleteInsight = function () {
            _.remove(vm.planAdditional.insight.list, vm.selectedInsight);
            initInsight();
        };

        vm.clearImage = function (model) {
            model.value = '';
            model.src = '';
        };

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
                    model.src = vm.base64FeedImage;
                }, function (error) {
                    vm.uploadingFeedImage = false;
                    NotificationService.displayError(error.message);
                }, function (progress) {
                    vm.uploadFeedImageProgress = progress;
                });
        };

        function init() {
            vm.planAdditional = {};
            vm.planAdditional = angular.extend(vm.planAdditional, ConfigService.getCachedConfig().planAdditional);

            initNewsFeed();
            initInsight();
        }

        function initNewsFeed() {
            vm.selectedNewsFeed = vm.planAdditional.newsFeed.list[0];
        }

        function initInsight() {
            vm.selectedInsight = vm.planAdditional.insight.list[0];
        }
    }
})();
