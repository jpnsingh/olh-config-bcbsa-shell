(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = ConfigApiController;

    function ConfigApiController() {
        return {
            groupConfig: groupConfig,
            saveGroupConfig: saveGroupConfig
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

        function saveGroupConfig(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

            var config = request.body;

            mongodb.connect(url, function (error, db) {
                db.collection('groups').updateOne({'_id': request.params.groupId}, {$set: {config: config}}, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        response.json({groupConfig: config});
                    }
                });
            });
        }
    }
})();
