'use strict';

import {FileUploaderService} from '../../../../src/client/js/upload/file.upload.service';

describe('FileUploader:', () => {
    let q,
        deferred,
        Upload,
        service;

    beforeEach(inject(function ($q) {
        q = $q;
        deferred = q.defer();
    }));

    beforeEach(() => {
        bard.inject(this, '$q', '$timeout');

        Upload = {
            upload: ''
        };

        spyOn(Upload, 'upload').and.returnValue(deferred.promise);

        service = new FileUploaderService(Upload);
    });

    describe('uploadFile', () => {
        it('should respond with the uploaded file in success', () => {
            service.uploadFile({fileName: 'test.test'});

            expect(Upload.upload).toHaveBeenCalled();
        });
    });
});
