(function () {
    'use strict';

    xdescribe('ConfigurationFactory:', function () {
        var _q,
            _deferred,
            _rootScope,
            _http,
            _timeout,
            _configService,
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

        beforeEach(inject(function ($q, $rootScope, $http, $timeout, ConfigService) {
            _q = $q;
            _deferred = _q.defer();

            _rootScope = $rootScope;

            _http = $http;
            spyOn(_http, 'get').and.returnValue(_deferred.promise);

            _timeout = $timeout;

            _configService = ConfigService;
        }));

        describe('getGroupConfig:', function () {
            it('should fetch the default config from config api and resolve the promise accordingly', function () {
                _configService.getGroupConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.resolve(_successResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_successResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _configService.getGroupConfig();

                expect(_http.get).toHaveBeenCalledWith('api/config/root');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('cacheConfig and getCachedConfig', function () {
            it('should cache the passed config and return the same respectively', function () {
                _configService.cacheConfig(_successResponse.data.config);

                expect(_configService.getCachedConfig()).toEqual(_successResponse.data.config);
            });
        });

        describe('getConfigurableLanguages', function () {
            it('should return the array of configurable languages accordingly', function () {
                expect(_configService.getConfigurableLanguages().length).toBe(3);
            });
        });
    });
})();
