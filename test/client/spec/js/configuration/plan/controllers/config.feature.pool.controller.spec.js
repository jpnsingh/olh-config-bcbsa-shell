(function () {
    'use strict';

    describe('FeaturePoolCtrl', function () {
        var scope,
            q,
            defer,
            _timeout,
            ConfigService,
            FileUploader,
            App,
            NotificationService,
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
            },
            testModel = {
                src: ''
            },
            fileUploadResponse = {
                file: {
                    headers: {
                        'content-type': 'image/png'
                    },
                    base64String: 'imageBase64String...'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.shared.fieldFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.appFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.controllers.featurePoolController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, _App_, $controller) {
            scope = $rootScope.$new();

            q = $q;
            defer = q.defer();
            _timeout = $timeout;

            ConfigService = {
                getCachedConfig: jasmine.createSpy('getCachedConfig').and.returnValue(cachedConfig)
            };

            FileUploader = {
                uploadFile: jasmine.createSpy('uploadFile').and.returnValue(defer.promise)
            };

            App = _App_;
            NotificationService = {
                displayError: jasmine.createSpy('displayError'),
                displaySuccess: jasmine.createSpy('displaySuccess')
            };
            controller = $controller('FeaturePoolCtrl', {
                $scope: scope,
                ConfigService: ConfigService,
                FileUploader: FileUploader,
                App: App,
                NotificationService: NotificationService
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

        describe('uploadAppImage:', function () {
            it('should not return if no file is passed in', function () {
                controller.uploadAppImage();

                expect(controller.uploadingAppImage).not.toBeDefined();
            });

            it('should invoke FileUploader if a file and model is passed in', function () {
                controller.uploadAppImage(testFile, testModel);

                expect(controller.uploadingAppImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.resolve(fileUploadResponse);
                _timeout.flush();

                expect(controller.uploadingAppImage).toBe(false);
                expect(controller.base64AppImage).toBe('data:image/png;base64,imageBase64String...');
                expect(testModel.src).toBe('data:image/png;base64,imageBase64String...');
            });

            it('should handle the error accordingly when FileUploader promise is rejected', function () {
                controller.uploadAppImage(testFile, testModel);

                expect(controller.uploadingAppImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.reject({message: 'Error Uploading file.'});
                _timeout.flush();

                expect(controller.uploadingAppImage).toBe(false);
                expect(NotificationService.displayError).toHaveBeenCalledWith('Error Uploading file.');
            });
        });
    });
})();
