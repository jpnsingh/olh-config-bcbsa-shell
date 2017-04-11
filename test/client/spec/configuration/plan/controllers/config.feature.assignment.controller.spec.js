(function () {
    'use strict';

    describe('FeatureAssignmentCtrl', function () {
        var scope,
            ConfigService,
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
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.plan.controllers.featureAssignmentController'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            ConfigService = {
                getCachedConfig: jasmine.createSpy('getCachedConfig').and.returnValue(cachedConfig)
            };

            controller = $controller('FeatureAssignmentCtrl', {
                $scope: scope,
                ConfigService: ConfigService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(ConfigService.getCachedConfig).toHaveBeenCalled();
            expect(controller.rootConfig).toEqual(cachedConfig);
        });
    });
})();
