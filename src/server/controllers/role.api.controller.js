(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = RoleApiController;

    function RoleApiController() {
        var connectionString = dbConfig.dbConnectionString();

        return {
            getRoles: getRoles,
            addRole: addRole,
            updateRole: updateRole
        };

        function getRoles(request, response, next) {
            mongodb.connect(connectionString, function (error, db) {
                db.collection('roles').find({}).toArray(function (error, roles) {
                    if (error) {
                        next(error);
                    }

                    response.json({roles: roles});
                });
            });
        }

        function addRole(request, response, next) {
            var role = request.body;

            mongodb.connect(connectionString, function (error, db) {
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
            var role = request.body,
                query = {'_id': request.params.roleId},
                updateObj = {$set: {role: role}};

            mongodb.connect(connectionString, function (error, db) {
                db.collection('roles').updateOne(query, updateObj, function (error, result) {
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
