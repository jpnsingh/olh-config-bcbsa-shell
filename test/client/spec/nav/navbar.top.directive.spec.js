'use strict';

describe('navbarTop Directive:', () => {
    let element,
        scope,
        compiler,
        compile = () => {
            element = compiler('<data-navbar-top></data-navbar-top>')(scope);
            scope.$apply();
        };

    beforeEach(angular.mock.module('pascalprecht.translate'));
    beforeEach(angular.mock.module('bcbsa-shell-templates'));
    beforeEach(angular.mock.module('bcbsa-shell.navigation'));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        compiler = $compile;
    }));

    it('should render the generic top nav bar for the application', () => {
        compile();
        expect(element.length).toBe(1);
    });

    it('should be an inverse nav bar', () => {
        compile();
        expect(element.hasClass('navbar-inverse')).toBe(true);
        expect(element.attr('class')).toContain('navbar-inverse');
    });

    it('should be fixed to top', () => {
        compile();
        expect(element.hasClass('navbar-fixed-top')).toBe(true);
        expect(element.attr('class')).toContain('navbar-fixed-top');
    });
});
