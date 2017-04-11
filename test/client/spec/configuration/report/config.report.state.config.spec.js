'use strict';

import {ConfigReportStateConfig} from '../../../../../src/client/js/configuration/report/config.report.state.config';

describe('ConfigReportStateConfig', () => {
    let $stateProvider,
        config;

    beforeEach(() => {
        $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
        $stateProvider.state.and.returnValue($stateProvider);
        config = ConfigReportStateConfig($stateProvider);
    });

    describe('when initializing', () => {
        it('should do the needful', () => {
            expect($stateProvider.state).toHaveBeenCalled();
            expect($stateProvider.state.calls.count()).toBe(1);
            expect($stateProvider.state.calls.argsFor(0)[0].name).toBe('configuration.report');
        });
    });
});
