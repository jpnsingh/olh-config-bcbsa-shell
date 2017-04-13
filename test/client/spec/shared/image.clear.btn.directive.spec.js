'use strict';

describe('imageClear Directive:', () => {
    let element,
        scope,
        compiler,
        compile;

    beforeEach(angular.mock.module('pascalprecht.translate'));
    beforeEach(angular.mock.module('bcbsa-shell-templates'));
    beforeEach(angular.mock.module('bcbsa-shell.shared'));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        compiler = $compile;
        compile = () => {
            element = compiler('<data-image-clear data-image-model="imageModel"></data-image-clear>')(scope);
            scope.$apply();
        };
    }));

    it('should render the element accordingly', () => {
        compile();
        expect(element.length).toBe(1);
    });

    it('should contain just a clear button', () => {
        compile();

        expect(element.length).toBe(1);
        console.log(element);
        expect(element.attr('type')).toBe('button');
        expect(element.children('.fa.fa-times').length).toBe(1);
    });

    describe('clearButton:', () => {
        it('should be hidden if the image model does not have value', () => {
            scope.imageModel = {};
            compile();

            expect(element.hasClass('ng-hide')).toBe(true);
        });

        it('should be visible if the image model has value', () => {
            scope.imageModel = {
                value: 'test.image.png',
                src: 'src/test.image'
            };
            compile();

            expect(element.hasClass('ng-hide')).toBe(false);
        });

        it('should clear the image model upon click and hide itself', () => {
            scope.imageModel = {
                value: 'test.image.png',
                src: 'src/test.image'
            };
            compile();

            element.click();

            expect(scope.imageModel.value).toBe('');
            expect(scope.imageModel.src).toBe('');
            expect(element.hasClass('ng-hide')).toBe(true);
        });
    });
});
