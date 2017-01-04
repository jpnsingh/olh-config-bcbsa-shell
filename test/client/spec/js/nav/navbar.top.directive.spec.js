(function () {
    'use strict';

    describe('BCSBA Nav Directive', function () {
        var element,
            scope,
            compiler,
            httpBackend;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            scope = $rootScope.$new();
            compiler = $compile;
            httpBackend = $httpBackend;
        }));

        xit('should render the generic navigational bar for the application', function () {
            element = compiler('<data-navbar-top></data-navbar-top>')(scope);
            console.log(element);
            scope.$apply();
        });
    });
})();
