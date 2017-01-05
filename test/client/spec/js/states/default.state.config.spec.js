(function () {
    'use strict';

    var DefaultStateConfig = require('../../../../../src/client/js/states/default.state.config');

    describe('DefaultStateConfig', function () {
        var $urlMatcherFactoryProvider,
            $urlRouterProvider,
            $locationProvider,
            $stateProvider,
            config;

        beforeEach(function () {
            $urlMatcherFactoryProvider = jasmine.createSpyObj('$urlMatcherFactoryProvider', ['caseInsensitive', 'strictMode']);
            $urlRouterProvider = jasmine.createSpyObj('$urlRouterProvider', ['when', 'otherwise']);
            $locationProvider = jasmine.createSpyObj('$locationProvider', ['html5Mode']);
            $stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);
            $stateProvider.state.and.returnValue($stateProvider);
        });

        describe('when initializing', function () {
            it('should do the needful', function () {
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
    })
})();
