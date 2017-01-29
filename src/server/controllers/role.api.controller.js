(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = RoleApiController;

    function RoleApiController() {
        return {
            getRoles: getRoles,
            addRole: addRole,
            updateRole: updateRole
        };

        function getRoles(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

            mongodb.connect(url, function (error, db) {
                db.collection('roles').find({}).toArray(function (error, roles) {
                    if (error) {
                        next(error);
                    }

                    response.json({roles: roles});
                });
            });
        }

        function addRole(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

            var role = request.body;

            mongodb.connect(url, function (error, db) {
                db.collection('roles').insertOne(role, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        response.json({role: result.ops[0]});
                    }
                });
            });
        }

        function updateRole(request, response, next) {
            var url = dbConfig.dbConnectionUrl();

            var role = request.body;

            mongodb.connect(url, function (error, db) {
                db.collection('roles').updateOne({'_id': request.params.roleId}, {$set: {role: role}}, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        response.json({groupConfig: role});
                    }
                });
            });
        }
    }
})();
