'use strict';

describe('loadingSpinner Directive:', () => {
    let element,
        scope,
        compiler,
        compile = () => {
            element = compiler('<data-loading-spinner data-loading="loading"></data-loading-spinner>')(scope);
            scope.$apply();
        };

    beforeEach(angular.mock.module('pascalprecht.translate'));
    beforeEach(angular.mock.module('bcbsa-shell-templates'));
    beforeEach(angular.mock.module('bcbsa-shell.shared'));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        compiler = $compile;
    }));

    it('should render the loading spinner element accordingly', () => {
        compile();
        expect(element.length).toBe(1);
        expect(element.hasClass('loading-spinner')).toBe(true);
    });

    it('should keep the spinner hidden based on the loading flag if false', () => {
        compile();
        expect(element.hasClass('ng-hide')).toBe(true);
    });

    it('should show the spinner based on the loading flag if true', () => {
        scope.loading = true;
        compile();
        expect(element.hasClass('ng-hide')).toBe(false);
    });

    it('should contain the icon with spinner classes', () => {
        compile();
        expect(element.find('i').hasClass('fa fa-spinner fa-pulse')).toBe(true);
    });

    it('should show loading text', () => {
        compile();
        expect(element.text().trim()).toBe('Loading...');
    });
});
