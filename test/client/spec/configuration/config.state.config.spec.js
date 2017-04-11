'use strict';

import {ConfigStateConfig} from '../../../../src/client/js/configuration/config.state.config';

describe('ConfigStateConfig', () => {
    let $stateProvider,
        config;

    beforeEach(() => {
        $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
        $stateProvider.state.and.returnValue($stateProvider);
        config = ConfigStateConfig($stateProvider);
    });

    describe('when initializing', () => {
        it('should do the needful', () => {
            expect($stateProvider.state).toHaveBeenCalled();
            expect($stateProvider.state.calls.count()).toBe(1);
            expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration');
        });
    });
});
