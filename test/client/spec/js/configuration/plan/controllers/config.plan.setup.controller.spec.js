(function () {
    'use strict';

    describe('PlanSetupCtrl:', function () {
        var scope,
            q,
            defer,
            _timeout,
            ConfigService,
            FileUploader,
            NotificationService,
            controller,
            cachedConfig = {
                planSetup: {
                    branding: {
                        header: 'Branding'
                    }
                }
            },
            languages = [
                {id: 'english', value: 'English'},
                {id: 'spanish', value: 'Spanish'},
                {id: 'french', value: 'French'}
            ],
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

        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.controllers.planSetupController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            scope = $rootScope.$new();

            q = $q;
            defer = q.defer();
            _timeout = $timeout;

            ConfigService = {
                getCachedConfig: jasmine.createSpy().and.returnValue(cachedConfig),
                getConfigurableLanguages: jasmine.createSpy().and.returnValue(languages)
            };

            FileUploader = {
                uploadFile: jasmine.createSpy('uploadFile').and.returnValue(defer.promise)
            };

            NotificationService = {
                displayError: jasmine.createSpy(),
                displaySuccess: jasmine.createSpy()
            };

            controller = $controller('PlanSetupCtrl', {
                $scope: scope,
                ConfigService: ConfigService,
                FileUploader: FileUploader,
                NotificationService: NotificationService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.rootConfig).toBeDefined();
            expect(controller.planSetup).toBeDefined();
            expect(controller.planSetup.branding.header).toBe('Branding');

            expect(controller.languages).toBeDefined();
            expect(controller.languages.length).toBe(3);
        });

        describe('uploadLogo:', function () {
            it('should not return if no file is passed in', function () {
                controller.uploadLogo();

                expect(controller.uploadingLogo).not.toBeDefined();
            });

            it('should invoke FileUploader if a file and model is passed in', function () {
                controller.uploadLogo(testFile, testModel);

                expect(controller.uploadingLogo).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.resolve(fileUploadResponse);
                _timeout.flush();

                expect(controller.uploadingLogo).toBe(false);
                expect(controller.base64Logo).toBe('data:image/png;base64,imageBase64String...');
                expect(testModel.src).toBe('data:image/png;base64,imageBase64String...');
            });

            it('should handle the error accordingly when FileUploader promise is rejected', function () {
                controller.uploadLogo(testFile, testModel);

                expect(controller.uploadingLogo).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.reject({message: 'Error Uploading file.'});
                _timeout.flush();

                expect(controller.uploadingLogo).toBe(false);
                expect(NotificationService.displayError).toHaveBeenCalledWith('Error Uploading file.');
            });
        });

        describe('uploadBackgroundImage:', function () {
            it('should not return if no file is passed in', function () {
                controller.uploadBackgroundImage();

                expect(controller.uploadingBackgroundImage).not.toBeDefined();
            });

            it('should invoke FileUploader if a file and model is passed in', function () {
                controller.uploadBackgroundImage(testFile, testModel);

                expect(controller.uploadingBackgroundImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.resolve(fileUploadResponse);
                _timeout.flush();

                expect(controller.uploadingBackgroundImage).toBe(false);
                expect(controller.base64BackgroundImage).toBe('data:image/png;base64,imageBase64String...');
                expect(testModel.src).toBe('data:image/png;base64,imageBase64String...');
            });

            it('should handle the error accordingly when FileUploader promise is rejected', function () {
                controller.uploadBackgroundImage(testFile, testModel);

                expect(controller.uploadingBackgroundImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.reject({message: 'Error Uploading file.'});
                _timeout.flush();

                expect(controller.uploadingBackgroundImage).toBe(false);
                expect(NotificationService.displayError).toHaveBeenCalledWith('Error Uploading file.');
            });
        });
    });
})();
