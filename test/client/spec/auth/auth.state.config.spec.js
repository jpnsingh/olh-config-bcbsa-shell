'use strict';

import {AuthStateConfig} from '../../../../src/client/js/auth/auth.state.config';

describe('AuthStateConfig', () => {
    let $stateProvider,
        config;

    beforeEach(() => {
        $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
        $stateProvider.state.and.returnValue($stateProvider);
        config = AuthStateConfig($stateProvider);
    });

    describe('when initializing', () => {
        it('should do the needful', () => {
            expect($stateProvider.state).toHaveBeenCalled();
            expect($stateProvider.state.calls.count()).toBe(3);
            expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('login');
            expect($stateProvider.state.calls.argsFor(1)[0].name).toBe('logout');
            expect($stateProvider.state.calls.argsFor(2)[0].name).toBe('register');
        });
    });
});
