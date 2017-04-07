(function () {
    'use strict';

    var ConfigPlanStateConfig = require('../../../../../src/client/js/configuration/plan/config.plan.state.config.js');

    describe('ConfigPlanStateConfig', function () {
        var $stateProvider,
            config;

        beforeEach(function () {
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
            config = ConfigPlanStateConfig($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
                expect($stateProvider.state).toHaveBeenCalled();
                expect($stateProvider.state.calls.count()).toBe(5);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration.plan');
                expect($stateProvider.state.calls.argsFor(1)[0].name).toBe('configuration.plan.setup');
                expect($stateProvider.state.calls.argsFor(2)[0].name).toBe('configuration.plan.additional');
                expect($stateProvider.state.calls.argsFor(3)[0].name).toBe('configuration.plan.featurePool');
                expect($stateProvider.state.calls.argsFor(4)[0].name).toBe('configuration.plan.featureAssignment');
            });
        });
    });
})();
