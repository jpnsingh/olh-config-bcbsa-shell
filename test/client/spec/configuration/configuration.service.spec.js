'use strict';

describe('ConfigService:', () => {
    let _q,
        _deferred,
        _rootScope,
        _http,
        _auth,
        _timeout,
        _configService,
        _groupData = {
            groups: [
                {_id: 'root', name: 'Root', config: {planSetup: {}, planAdditional: {}, featurePool: {}}},
                {_id: 'bcbst', name: 'BCBST', config: {planSetup: {}, planAdditional: {}, featurePool: {}}}
            ]
        },
        _successResponse = {
            data: {
                groupConfig: {
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

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('bcbsa-shell.auth'));
    beforeEach(angular.mock.module('bcbsa-shell.configuration.services.configurationService'));

    beforeEach(inject(function ($q, $rootScope, $http, auth, $timeout, ConfigService) {
        _q = $q;
        _deferred = _q.defer();

        _rootScope = $rootScope;

        _http = $http;
        spyOn(_http, 'get').and.returnValue(_deferred.promise);
        spyOn(_http, 'post').and.returnValue(_deferred.promise);

        _auth = auth;
        spyOn(_auth, 'currentUser').and.returnValue({
            auth: {
                userName: 'TestUser',
                password: 'pwd'
            }
        });

        _timeout = $timeout;

        _configService = ConfigService;
    }));

    describe('listGroups:', () => {
        it('should fetch the list of groups', () => {
            _configService.listGroups();

            expect(_http.get).toHaveBeenCalledWith('api/config/list');

            _deferred.resolve(_groupData);

            _timeout.flush();

            expect(_deferred.promise).toResolveWith(_groupData);
        });

        it('should handle the promise rejection accordingly', () => {
            _configService.listGroups();

            expect(_http.get).toHaveBeenCalledWith('api/config/list');

            _deferred.reject(_errorResponse);

            _timeout.flush();

            expect(_deferred.promise).toRejectWith(_errorResponse);
        });
    });

    describe('getGroupConfig:', () => {
        it('should fetch the default config from config api and resolve the promise accordingly', () => {
            _configService.getGroupConfig('root');

            expect(_http.get).toHaveBeenCalledWith('api/config/root');

            _deferred.resolve(_successResponse);

            _timeout.flush();

            expect(_deferred.promise).toResolveWith(_successResponse);
        });

        it('should handle the promise rejection accordingly', () => {
            _configService.getGroupConfig('root');

            expect(_http.get).toHaveBeenCalledWith('api/config/root');

            _deferred.reject(_errorResponse);

            _timeout.flush();

            expect(_deferred.promise).toRejectWith(_errorResponse);
        });
    });

    describe('cacheConfig and getCachedConfig:', () => {
        it('should cache the passed config and return the same respectively', () => {
            _configService.cacheConfig(_successResponse.data.config);

            expect(_configService.getCachedConfig()).toEqual(_successResponse.data.config);
        });
    });


    describe('updateConfig:', () => {
        it('should update the passed config accordingly for the provided groupId', () => {
            _configService.updateConfig(_groupData.groups[1].config, 'bcbst');

            expect(_http.post).toHaveBeenCalledWith('api/config/bcbst', {
                config: _groupData.groups[1].config,
                userName: 'TestUser'
            }, {});

            _deferred.resolve(_successResponse);

            _timeout.flush();

            expect(_deferred.promise).toResolveWith(_successResponse);
        });
    });

    describe('getConfigurableLanguages:', () => {
        it('should return the array of configurable languages accordingly', () => {
            expect(_configService.getConfigurableLanguages().length).toBe(3);
        });
    });
});
