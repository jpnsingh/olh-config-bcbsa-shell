(function () {
    'use strict';

    var AuthStateConfig = require('../../../../../src/client/js/auth/auth.state.config');

    describe('AuthStateConfig', function () {
        var $stateProvider,
            config;

        beforeEach(function () {
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
            config = AuthStateConfig($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
                expect($stateProvider.state).toHaveBeenCalled();
                expect($stateProvider.state.calls.count()).toBe(3);
                expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('login');
                expect($stateProvider.state.calls.argsFor(1)[0].name).toBe('logout');
                expect($stateProvider.state.calls.argsFor(2)[0].name).toBe('register');
            });
        });
    });
})();
