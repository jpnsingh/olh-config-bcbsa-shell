(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.plan.controllers.planAdditionalController', [])
        .controller('PlanAdditionalCtrl', PlanAdditionalCtrl);

    PlanAdditionalCtrl.$inject = ['ConfigService', 'NewsFeed', 'Insight'];
    function PlanAdditionalCtrl(ConfigService, NewsFeed, Insight) {
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
