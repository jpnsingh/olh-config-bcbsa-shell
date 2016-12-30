(function () {
    'use strict';

    describe('SettingsCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('SettingsCtrl as settingsCtrl', {$scope: scope});
            });
        });

        it('should initialize the controller accordingly', function () {
            assert.isDefined(controller.texts);
            assert.equal(controller.texts.header, 'Settings');
        });
    });
})();
