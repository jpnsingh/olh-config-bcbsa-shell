(function () {
    'use strict';

    describe('ConfigCtrl:', function () {
        var scope,
            q,
            deferredUserGroups,
            deferredGroupConfig,
            _timeout,
            ConfigPlan,
            ConfigService,
            UserService,
            NotificationService,
            controller,
            groupData = [
                {_id: 'root', name: 'Root', config: {test: 'test'}},
                {_id: 'bcbst', name: 'BCBST', config: {test: 'test'}}
            ],
            responseUserGroups = {
                groups: groupData
            },
            responseData = {
                config: {
                    test: 'test'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.controllers.ConfigurationController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            scope = $rootScope.$new();
            q = $q;
            deferredUserGroups = q.defer();
            deferredGroupConfig = q.defer();
            _timeout = $timeout;

            ConfigPlan = {};

            UserService = {
                getUserGroups: jasmine.createSpy().and.returnValue(deferredUserGroups.promise)
            };

            ConfigService = {
                getGroupConfig: jasmine.createSpy().and.returnValue(deferredGroupConfig.promise),
                cacheConfig: jasmine.createSpy()
            };

            NotificationService = {
                displaySuccess: jasmine.createSpy(),
                displayError: jasmine.createSpy()
            };

            controller = $controller('ConfigCtrl as configCtrl', {
                $scope: scope,
                ConfigPlan: ConfigPlan,
                ConfigService: ConfigService,
                UserService: UserService,
                NotificationService: NotificationService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.config).toBeDefined();
        });

        it('should initialize the user groups first and set first one from the list as selected an then initialize the group config accordingly', function () {
            expect(UserService.getUserGroups).toHaveBeenCalled();

            deferredUserGroups.resolve(responseUserGroups);
            _timeout.flush();

            expect(controller.userGroups).toBeDefined();
            expect(controller.selectedGroup).toEqual(responseUserGroups.groups[0]);

            expect(controller.loadingConfig).toBeTruthy();
            expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('root');

            deferredGroupConfig.resolve(groupData[0]);
            _timeout.flush();

            expect(controller.loadingConfig).toBeFalsy();
            expect(controller.groupId).toEqual('root');
            expect(controller.planConfigured).toBe(true);
            expect(controller.config).toEqual(jasmine.objectContaining(groupData[0].config));
        });
    });
})();
