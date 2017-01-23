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
            // var url = dbConfig.dbConnectionUrl();

            var form = new multiparty.Form();

            form.parse(request, function (err, fields, files) {
                if (err) {
                    next(err);
                }

                var uploadedFile = files.file[0];
                console.log(uploadedFile);

                fs.readFile(uploadedFile.path, 'binary', function (err, originalData) {
                    if (err) {
                        next(err);
                    }
                    // fs.writeFile('image_orig.png', originalData, 'binary', function (err) {
                    // });
                    uploadedFile.base64String = new Buffer(originalData, 'binary').toString('base64');
                    // console.log('base64 str:');
                    // console.log(base64Image);
                    // console.log(base64Image.length);

                    // var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
                    // console.log('decodedImage:');
                    // console.log(decodedImage);
                    // fs.writeFile('image_decoded.png', decodedImage, 'binary', function (err) {
                    // });

                    response.json({file: uploadedFile});
                });

            });

            // mongodb.connect(url, function (error, db) {
            //     db.collection('groups').findOne({'_id': request.params.groupId}, function (error, groupConfig) {
            //         if (error) {
            //             next(error);
            //         }
            //
            //         if (!groupConfig) {
            //             return next(null, false, {message: 'Group Configuration Not Found!'});
            //         }
            //
            //         response.json({groupConfig: groupConfig});
            //     });
            // });
        }
    }
})();
