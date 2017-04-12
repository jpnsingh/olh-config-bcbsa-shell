'use strict';

describe('navbarBottom Directive:', () => {
    var element,
        scope,
        compiler,
        compile;

    beforeEach(angular.mock.module('pascalprecht.translate'));
    beforeEach(angular.mock.module('bcbsa-shell-templates'));
    beforeEach(angular.mock.module('bcbsa-shell.navigation'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compiler = $compile;
        compile = () => {
            element = compiler('<data-navbar-bottom></data-navbar-bottom>')(scope);
            scope.$apply();
        }
    }));

    it('should render the generic bottom nav bar for the application', () => {
        compile();
        expect(element.length).toBe(1);
    });

    it('should render a default navbar', () => {
        compile();
        expect(element.hasClass('navbar')).toBe(true);
        expect(element.hasClass('navbar-default')).toBe(true);
    });

    it('should render a navbar that is fixed to bottom', () => {
        compile();
        expect(element.hasClass('navbar-fixed-bottom')).toBe(true);
    });
});
