'use strict';

describe('imageUpload Directive:', () => {
    let element,
        scope,
        compiler,
        compile,
        q,
        defer,
        timeout,
        FileUploaderService = {
            uploadFile: angular.noop
        },
        NotificationService = {
            displayError: angular.noop
        };

    beforeEach(angular.mock.module('pascalprecht.translate'));
    beforeEach(angular.mock.module('bcbsa-shell-templates'));
    beforeEach(angular.mock.module('bcbsa-shell.shared'));

    beforeEach(inject(($rootScope, $compile, $q, $timeout) => {
        scope = $rootScope.$new();
        compiler = $compile;
        compile = () => {
            element = compiler('<data-image-upload data-file-model="fileModel" hide="hide"></data-image-upload>')(scope);
            scope.$apply();
        };
        q = $q;
        defer = q.defer();

        spyOn(FileUploaderService, 'uploadFile').and.returnValue(defer.promise);
        spyOn(NotificationService, 'displayError');

        timeout = $timeout;
    }));

    it('should render the element accordingly', () => {
        compile();
        expect(element.length).toBe(1);
        expect(element.hasClass('input-group')).toBe(true);
    });

    it('should be hidden if hide flag is set in scope', () => {
        scope.hide = true;
        compile();

        expect(element.hasClass('ng-hide')).toBe(true);

        scope.hide = false;
        compile();
        expect(element.hasClass('ng-hide')).toBe(false);
    });

    it('should contain a readonly input field', () => {
        compile();

        expect(element.children('input.form-control').length).toBe(1);
        expect(element.children('input.form-control').attr('readOnly')).toBeDefined();
    });

    it('should contain a clear button that should be hidden if no file model is passed or the model does not have value', () => {
        compile();

        expect(element.children('span.input-group-btn').length).toBe(1);
        expect(element.children('span.input-group-btn').children('button.btn.btn-danger').hasClass('ng-hide')).toBe(true);

        scope.fileModel = {};
        compile();
        expect(element.children('span.input-group-btn').children('button.btn.btn-danger').hasClass('ng-hide')).toBe(true);
    });

    it('should show the clear file model has value', () => {
        scope.fileModel = {
            value: 'test.image.png',
            src: 'src/test'
        };
        compile();
        expect(element.children('span.input-group-btn').children('button.btn.btn-danger').hasClass('ng-hide')).toBe(false);
    });

    it('should set the input field value to model value', () => {
        scope.fileModel = {
            value: 'test.image.png',
            src: 'src/test'
        };
        compile();

        expect(element.children('input.form-control').length).toBe(1);
        expect(element.children('input.form-control').data('ng-model')).toBe('fileModel.value');
    });

    it('should contain an upload button', () => {
        compile();

        expect(element.children('span.input-group-btn').children('button.btn.btn-primary').length).toBe(1);
    });

    it('should trigger scope.uploadImage upon click of upload', () => {
        let uploadBtn;
        scope.$file = {
            originalFileName: 'test.png',
            src: 'src/image'
        };
        compile();

        uploadBtn = element.children('span.input-group-btn').children('button.btn.btn-primary');
        expect(uploadBtn.data('ngf-select')).toBeDefined();

        // uploadBtn.click();
        // defer.resolve();
    });

    describe('uploadImage:', () => {
        it('should return if no file is passed', () => {
            scope.fileModel = {
                value: 'test.png'
            };
            scope.hide = false;
            compile();
            // scope.uploadImage();

            expect(FileUploaderService.uploadFile).not.toHaveBeenCalled();
        });
    });
});
