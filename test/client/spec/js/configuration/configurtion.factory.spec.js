(function () {
    'use strict';

    describe('auth service:', function () {
        var _q,
            _deferred,
            _rootScope,
            _http,
            _timeout,
            _configFactory,
            _successResponse = {
                data: {
                    config: {
                        planSetup: {},
                        planAdditional: {},
                        featurePool: {},
                        featureAssignment: {},
                        tabs: [
                            {}
                        ]
                    }
                }
            },
            _errorResponse = {
                data: {
                    error: 'Error'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.services.configurationFactory'));

        beforeEach(inject(function ($q, $rootScope, $http, $timeout, ConfigFactory) {
            _q = $q;
            _deferred = _q.defer();

            _rootScope = $rootScope;

            _http = $http;
            spyOn(_http, 'get').and.returnValue(_deferred.promise);

            _timeout = $timeout;

            _configFactory = ConfigFactory;
        }));

        describe('getDefaultConfig:', function () {
            it('should fetch the default config from config api and resolve the promise accordingly', function () {
                _configFactory.getDefaultConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.resolve(_successResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_successResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _configFactory.getDefaultConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });
    });
})();
