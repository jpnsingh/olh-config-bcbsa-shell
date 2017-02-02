(function () {
    'use strict';

    xdescribe('ConfigurationFactory:', function () {
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

        describe('getGroupConfig:', function () {
            it('should fetch the default config from config api and resolve the promise accordingly', function () {
                _configFactory.getGroupConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.resolve(_successResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_successResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _configFactory.getGroupConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('cacheConfig and getCachedConfig', function () {
            it('should cache the passed config and return the same respectively', function () {
                _configFactory.cacheConfig(_successResponse.data.config);

                expect(_configFactory.getCachedConfig()).toEqual(_successResponse.data.config);
            });
        });

        describe('getConfigurableLanguages', function () {
            it('should return the array of configurable languages accordingly', function () {
                expect(_configFactory.getConfigurableLanguages().length).toBe(3);
            });
        });
    });
})();
