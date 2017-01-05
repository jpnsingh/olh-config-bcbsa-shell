(function () {
    'use strict';

    var ConfigStateConfig = require('../../../../../src/client/js/configuration/config.state.config');

    describe('AuthStateConfig', function () {
        var $stateProvider,
            config;

        beforeEach(function () {
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
            config = ConfigStateConfig($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
                expect($stateProvider.state).toHaveBeenCalled();
                expect($stateProvider.state.calls.count()).toBe(5);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration');
                expect($stateProvider.state.calls.argsFor(1)[0].name).toBe('configuration.planSetup');
                expect($stateProvider.state.calls.argsFor(2)[0].name).toBe('configuration.planAdditional');
                expect($stateProvider.state.calls.argsFor(3)[0].name).toBe('configuration.featurePool');
                expect($stateProvider.state.calls.argsFor(4)[0].name).toBe('configuration.featureAssignment');
            });
        });
    });
})();
