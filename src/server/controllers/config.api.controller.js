(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = ConfigApiController;

    function ConfigApiController() {
        return {
            groupConfig: groupConfig
        };

        function groupConfig(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

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
