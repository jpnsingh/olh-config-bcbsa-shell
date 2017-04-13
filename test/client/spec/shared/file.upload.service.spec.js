'use strict';

import {FileUploaderService} from '../../../../src/client/js/shared/file.upload.service';

describe('FileUploaderService:', () => {
    let q,
        deferred,
        timeout,
        Upload,
        fileToUpload,
        uploadSuccessResponse,
        uploadErrorResponse,
        service;

    beforeEach(inject(($q, $timeout) => {
        q = $q;
        deferred = q.defer();
        timeout = $timeout;
    }));

    beforeEach(() => {
        bard.inject(this, '$q', '$timeout');

        Upload = {
            upload: ''
        };

        fileToUpload = {
            fileName: 'test.test'
        };

        uploadSuccessResponse = {
            data: {
                file: {
                    originalFileName: 'test.png',
                    base64String: 'some,Random,base64String'
                }
            }
        };

        uploadErrorResponse = {
            data: {
                error: 'Error'
            }
        };

        spyOn(Upload, 'upload').and.returnValue(deferred.promise);

        service = new FileUploaderService(Upload);
    });

    describe('uploadFile', () => {
        it('should respond with the uploaded file in success', () => {
            service.uploadFile(fileToUpload);

            expect(Upload.upload).toHaveBeenCalledWith({url: 'api/upload/file', file: fileToUpload});

            deferred.resolve(uploadSuccessResponse);

            timeout.flush();

            expect(deferred.promise).toResolveWith(uploadSuccessResponse);
            expect(uploadSuccessResponse.data.file.base64String).toEqual('some,Random,base64String');
        });

        it('should handle the error accordingly', () => {
            service.uploadFile(fileToUpload);

            expect(Upload.upload).toHaveBeenCalledWith({url: 'api/upload/file', file: fileToUpload});

            deferred.reject(uploadErrorResponse);

            timeout.flush();

            expect(deferred.promise).toRejectWith(uploadErrorResponse);
        });
    });
});
