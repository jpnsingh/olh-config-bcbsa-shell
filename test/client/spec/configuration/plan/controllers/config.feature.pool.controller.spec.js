(function () {
    'use strict';

    describe('FeaturePoolCtrl', function () {
        var scope,
            q,
            defer,
            _timeout,
            ConfigService,
            App,
            controller,
            cachedConfig = {
                featurePool: {
                    appPool: [
                        {
                            displayName: {
                                label: 'Display Name',
                                type: 'text',
                                placeholder: 'Display Name',
                                value: ''
                            },
                            icon: {
                                label: 'Icon/Image',
                                type: 'image',
                                placeholder: 'Icon/Image',
                                value: '',
                                src: ''
                            },
                            appName: {
                                label: 'App Name',
                                type: 'text',
                                placeholder: 'App Name',
                                value: ''
                            },
                            appType: {
                                label: 'App Type',
                                type: 'text',
                                placeholder: 'App Type',
                                value: ''
                            },
                            appId: {
                                label: 'App ID',
                                type: 'text',
                                placeholder: 'App ID',
                                value: ''
                            },
                            appUrl: {
                                label: 'App URL',
                                type: 'text',
                                placeholder: 'App URL',
                                value: ''
                            },
                            storeUrl: {
                                label: 'Store URL',
                                type: 'text',
                                placeholder: 'Store URL',
                                value: ''
                            },
                            enabled: {
                                label: 'Enabled',
                                type: 'checkbox',
                                placeholder: 'Enabled',
                                value: false
                            }
                        }
                    ]
                }
            },
            testFile = {
                header: {
                    'content-type': 'image/png'
                },
                name: 'testFile'
            };

        beforeEach(angular.mock.module('bcbsa-shell.shared.factories'));
        beforeEach(angular.mock.module('bcbsa-shell.configuration.plan.factories.appFactory'));
        beforeEach(angular.mock.module('bcbsa-shell.configuration.plan.controllers.featurePoolController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, _App_, $controller) {
            scope = $rootScope.$new();

            q = $q;
            defer = q.defer();
            _timeout = $timeout;

            ConfigService = {
                getCachedConfig: jasmine.createSpy('getCachedConfig').and.returnValue(cachedConfig)
            };

            App = _App_;
            controller = $controller('FeaturePoolCtrl', {
                $scope: scope,
                ConfigService: ConfigService,
                App: App
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.featurePool).toEqual(cachedConfig.featurePool);
        });

        it('should initialize the App', function () {
            expect(controller.selected).toEqual(cachedConfig.featurePool.appPool[0]);
        });

        it('addApp: should add a new App to the appPool and make that selected for edit', function () {
            controller.addApp();
            expect(controller.featurePool.appPool.length).toBe(2);
            expect(controller.selected).toEqual(new App());

            controller.deleteApp();
        });

        it('deleteApp: should delete the selected App and reinitialize the selected', function () {
            controller.deleteApp();

            expect(controller.featurePool.appPool.length).toBe(0);
            expect(controller.selected).toBeUndefined();
        });
    });
})();
