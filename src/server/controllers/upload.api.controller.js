(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')(),
        multiparty = require('multiparty');

    module.exports = UploadApiController;

    function UploadApiController() {
        return {
            uploadImage: uploadImage
        };

        function uploadImage(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

            var form = new multiparty.Form();

            form.parse(request, function (err, fields, files) {
                var file = files.file[0];
                console.log(file);
            });

            mongodb.connect(url, function (error, db) {
                db.collection('groups').findOne({'_id': request.params.groupId}, function (error, groupConfig) {
                    if (error) {
                        next(error);
                    }

                    if (!groupConfig) {
                        return next(null, false, {message: 'Group Configuration Not Found!'});
                    }

                    response.json({groupConfig: groupConfig});
                });
            });
        }
    }
})();
