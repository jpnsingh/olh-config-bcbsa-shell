'use strict';

describe('imagePreview Directive:', () => {
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
            element = compiler('<data-image-preview data-preview-model="previewModel"></data-image-preview>')(scope);
            scope.$apply();
        };
    }));

    it('should render the element accordingly', () => {
        compile();
        expect(element.length).toBe(1);
    });

    it('should contain a preview button which toggles a preview modal', () => {
        let previewButton;
        compile();

        previewButton = element.children('button.btn.btn-default');
        expect(previewButton.length).toBe(1);
        expect(previewButton.data('toggle')).toBe('modal');
        expect(previewButton.data('target')).toBe('#previewModal');
    });

    it('should contain a preview modal dialog', () => {
        let previewModal;
        compile();

        previewModal = element.children('#previewModal');
        expect(previewModal.length).toBe(1);
        expect(previewModal.attr('role')).toBe('dialog');
        expect(previewModal.find('#imagePreviewModalTitle').text()).toContain('Background Image Preview');
    });

    describe('preview modal:', () => {
        it('should contain the title and img as defined in the scope', () => {
            let previewModal;
            scope.previewModel = {
                value: 'TestImage.png',
                src: 'http://test/src'
            };
            compile();

            previewModal = element.children('#previewModal');
            expect(previewModal.find('#imagePreviewModalTitle').text()).toContain('Background Image Preview');
            expect(previewModal.find('#imagePreviewModalTitle').text()).toContain('TestImage.png');
            expect(previewModal.find('img').attr('src')).toEqual('http://test/src');
        });
    });
});
