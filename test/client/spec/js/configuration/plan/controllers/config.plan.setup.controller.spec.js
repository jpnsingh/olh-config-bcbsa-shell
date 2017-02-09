(function () {
    'use strict';

    describe('PlanSetupCtrl', function () {
        var scope,
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
            ];

        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.controllers.planSetupController'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            ConfigService = {
                getCachedConfig: jasmine.createSpy().and.returnValue(cachedConfig),
                getConfigurableLanguages: jasmine.createSpy().and.returnValue(languages)
            };

            FileUploader = {
                uploadFile: jasmine.createSpy()
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
            expect(controller.planSetup).toBeDefined();
            expect(controller.planSetup.branding.header).toBe('Branding');

            expect(controller.languages).toBeDefined();
            expect(controller.languages.length).toBe(3);
        });
    });
})();
