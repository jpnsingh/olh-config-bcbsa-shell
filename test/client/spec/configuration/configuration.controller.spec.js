(function () {
    'use strict';

    describe('ConfigCtrl:', function () {
        var rootScope,
            scope,
            controller;

        beforeEach(angular.mock.module('bcbsa-shell.configuration.controllers.ConfigurationController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            controller = $controller('ConfigCtrl as configCtrl', {
                $scope: scope
            });
        }));

        it('should have the side bar defined for config screens', function () {
            expect(controller.sidebar).toBeDefined();
        });
    });
})();
