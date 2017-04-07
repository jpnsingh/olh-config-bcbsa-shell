(function () {
    'use strict';

    var ConfigStateConfig = require('../../../../src/client/js/configuration/config.state.config');

    describe('ConfigStateConfig', function () {
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
                expect($stateProvider.state.calls.count()).toBe(1);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration');
            });
        });
    });
})();
