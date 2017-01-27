(function () {
    'use strict';
    var multiparty = require('multiparty'),
        fs = require('fs');

    module.exports = UploadApiController;

    function UploadApiController() {
        return {
            uploadFile: uploadFile
        };

        function uploadFile(request, response, next) {
            var form = new multiparty.Form();

            form.parse(request, function (err, fields, files) {
                if (err) {
                    next(err);
                }

                var uploadedFile = files.file[0];

                fs.readFile(uploadedFile.path, 'binary', function (err, originalData) {
                    if (err) {
                        next(err);
                    }

                    uploadedFile.base64String = new Buffer(originalData, 'binary').toString('base64');
                    response.json({file: uploadedFile});
                });

            });
        }
    }
})();
