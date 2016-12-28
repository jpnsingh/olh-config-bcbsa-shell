(function () {
    'use strict';

    describe('BCSB Nav Directive', function () {
        var injector,
            element,
            scope,
            compiler,
            httpBackend;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell', 'ngMockE2E']);

            injector.invoke(function ($rootScope, $compile, $httpBackend) {
                scope = $rootScope.$new();
                compiler = $compile;
                httpBackend = $httpBackend;
            });
        });

        xit('should render the generic navigational bar for the application', function () {
            httpBackend.whenGET('templates/partials/navbar.html').passThrough();

            element = compiler('<data-bcbsa-nav></data-bcbsa-nav>')(scope);
            scope.$apply();
        });
    });
})();
