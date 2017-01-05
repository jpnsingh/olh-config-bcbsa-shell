(function () {
    'use strict';

    var SettingsStateConfig = require('../../../../../src/client/js/settings/settings.state.config');

    describe('AuthStateConfig', function () {
        var $stateProvider,
            config;

        beforeEach(function () {
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
            config = SettingsStateConfig($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
                expect($stateProvider.state).toHaveBeenCalled();
                expect($stateProvider.state.calls.count()).toBe(3);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('settings');
                expect($stateProvider.state.calls.argsFor(1)[0].name).toBe('settings.profile');
                expect($stateProvider.state.calls.argsFor(2)[0].name).toBe('settings.account');
            });
        });
    });
})();
