(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = ConfigApiController;

    function ConfigApiController() {
        var connectionString = dbConfig.dbConnectionString();

        return {
            groupConfig: groupConfig,
            saveGroupConfig: saveGroupConfig
        };

        function groupConfig(request, response, next) {
            var query = {'_id': request.params.groupId};

            mongodb.connect(connectionString, function (error, db) {
                db.collection('groups').findOne(query, function (error, groupConfig) {
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
            var config = request.body,
                query = {'_id': request.params.groupId},
                updateObj = {$set: {config: config}};

            mongodb.connect(connectionString, function (error, db) {
                db.collection('groups').updateOne(query, updateObj, function (error, result) {
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
