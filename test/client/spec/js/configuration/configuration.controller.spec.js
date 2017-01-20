(function () {
    'use strict';

    describe('ConfigCtrl', function () {
        var scope,
            q,
            deferred,
            _timeout,
            ConfigFactory,
            controller,
            responseData = {
                config: {
                    test: 'test'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.controllers.ConfigurationController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            scope = $rootScope.$new();
            q = $q;
            deferred = q.defer();
            _timeout = $timeout;
            ConfigFactory = {
                getDefaultConfig: jasmine.createSpy().and.returnValue(deferred.promise),
                cacheConfig: jasmine.createSpy()
            };

            controller = $controller('ConfigCtrl as configCtrl', {$scope: scope, ConfigFactory: ConfigFactory});
            controller.config = {};
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.loading).toBeTruthy();
        });

        it('should invoke the config factory and set the config accordingly', function () {
            expect(ConfigFactory.getDefaultConfig).toHaveBeenCalled();

            deferred.resolve(responseData);
            _timeout.flush();

            expect(controller.loading).toBeFalsy();
            expect(controller.config).toEqual(responseData.config);
            expect(ConfigFactory.cacheConfig).toHaveBeenCalled();
        });
    });
})();
