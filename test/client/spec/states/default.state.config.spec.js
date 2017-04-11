'use strict';

import {DefaultStateConfig} from '../../../../src/client/js/states/default.state.config';

describe('DefaultStateConfig', () => {
    let $urlMatcherFactoryProvider,
        $urlRouterProvider,
        $locationProvider,
        $stateProvider,
        config;

    beforeEach(() => {
        $urlMatcherFactoryProvider = jasmine.createSpyObj('$urlMatcherFactoryProvider', ['caseInsensitive', 'strictMode']);
        $urlRouterProvider = jasmine.createSpyObj('$urlRouterProvider', ['when', 'otherwise']);
        $locationProvider = jasmine.createSpyObj('$locationProvider', ['html5Mode']);
        $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
        $stateProvider.state.and.returnValue($stateProvider);
    });

    describe('when initializing', () => {
        it('should do the needful', () => {
            config = DefaultStateConfig($urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider, $stateProvider);

            expect($urlMatcherFactoryProvider.caseInsensitive).toHaveBeenCalledWith(true);
            expect($urlMatcherFactoryProvider.strictMode).toHaveBeenCalledWith(false);
            expect($urlRouterProvider.when).toHaveBeenCalledWith('', '/dashboard');
            expect($urlRouterProvider.otherwise).toHaveBeenCalledWith('/404');
            expect($locationProvider.html5Mode).toHaveBeenCalledWith(true);
            expect($stateProvider.state).toHaveBeenCalled();
            expect($stateProvider.state.calls.count()).toBe(6);
        });
    });
});
