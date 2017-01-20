(function () {
    'use strict';

    describe('PlanSetupCtrl', function () {
        var scope,
            ConfigFactory,
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

            ConfigFactory = {
                getCachedConfig: jasmine.createSpy().and.returnValue(cachedConfig),
                getConfigurableLanguages: jasmine.createSpy().and.returnValue(languages)
            };

            controller = $controller('PlanSetupCtrl', {$scope: scope, ConfigFactory: ConfigFactory});
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.planSetup).toBeDefined();
            expect(controller.planSetup.branding.header).toBe('Branding');

            expect(controller.languages).toBeDefined();
            expect(controller.languages.length).toBe(3);
        });
    });
})();
