(function () {
    'use strict';

    xdescribe('BCSB Nav Directive', function () {
        var injector,
            element,
            scope,
            compiler,
            httpBackend;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell', 'bcbsa-shell-templates']);

            injector.invoke(function ($rootScope, $compile, $httpBackend) {
                scope = $rootScope.$new();
                compiler = $compile;
                httpBackend = $httpBackend;
            });
        });

        it('should render the generic navigational bar for the application', function () {
            element = compiler('<data-bcbsa-nav></data-bcbsa-nav>')(scope);
            scope.$apply();
        });
    });
})();
