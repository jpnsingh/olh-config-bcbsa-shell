(function () {
    'use strict';

    describe('PlanSetupCtrl:', function () {
        var scope,
            q,
            defer,
            _timeout,
            ConfigService,
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

            controller = $controller('PlanSetupCtrl', {
                $scope: scope,
                ConfigService: ConfigService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.rootConfig).toBeDefined();
            expect(controller.planSetup).toBeDefined();
            expect(controller.planSetup.branding.header).toBe('Branding');

            expect(controller.languages).toBeDefined();
            expect(controller.languages.length).toBe(3);
        });
    });
})();
