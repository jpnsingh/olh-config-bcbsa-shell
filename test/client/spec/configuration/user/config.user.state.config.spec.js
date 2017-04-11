'use strict';

import {ConfigUserStateConfig} from '../../../../../src/client/js/configuration/user/config.user.state.config';

describe('ConfigUserStateConfig', () => {
    var $stateProvider,
        config;

    beforeEach(() => {
        $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
        $stateProvider.state.and.returnValue($stateProvider);
        config = ConfigUserStateConfig($stateProvider);
    });

    describe('when initializing', () => {
        it('should do the needful', () => {
            expect($stateProvider.state).toHaveBeenCalled();
            expect($stateProvider.state.calls.count()).toBe(1);
            expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration.user');
        });
    });
});
