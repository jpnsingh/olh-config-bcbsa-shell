(function () {
    'use strict';

    var ConfigRoleStateConfig = require('../../../../../../src/client/js/configuration/role/config.role.state.config');

    describe('ConfigRoleStateConfig', function () {
        var $stateProvider,
            config;

        beforeEach(function () {
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
            config = ConfigRoleStateConfig($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
                expect($stateProvider.state).toHaveBeenCalled();
                expect($stateProvider.state.calls.count()).toBe(1);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration.role');
            });
        });
    });
})();
