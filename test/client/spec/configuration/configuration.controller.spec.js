'use strict';

import {ConfigCtrl} from '../../../../src/client/js/configuration/configuration.controller';

describe('ConfigCtrl:', () => {
    let controller;

    beforeEach(() => {
        controller = new ConfigCtrl();
    });

    it('should have the side bar defined for config screens', () => {
        expect(controller.sidebar).toBeDefined();
        expect(controller.sidebar.length).toBe(4);
    });
});
