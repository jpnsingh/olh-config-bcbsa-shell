(function () {
    'use strict';
    var mongodb = require('mongodb'),
        ObjectID = mongodb.ObjectID,
        mongodbClient = mongodb.MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = RoleApiController;

    function RoleApiController() {
        var connectionString = dbConfig.dbConnectionString();

        return {
            listRoles: listRoles,
            userRoles: userRoles,
            addRole: addRole,
            updateRole: updateRole
        };

        function listRoles(request, response, next) {
            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('roles').find({}).toArray(function (error, roles) {
                    if (error) {
                        next(error);
                    }

                    response.json({roles: roles});
                });
            });
        }

        function userRoles(request, response, next) {
            var query = {},
                projection = {_id: 0, id: 1, name: 1};

            mongodbClient.connect(connectionString, function (error, db) {
                var cursor = db.collection('roles').find(query, projection);

                cursor.toArray(function (error, roles) {
                    if (error) {
                        next(error);
                    }

                    response.json({roles: roles});
                });
            });
        }

        function addRole(request, response, next) {
            var role = request.body;

            mongodbClient.connect(connectionString, function (error, db) {
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
            var role = request.body.role,
                userName = request.body.userName,
                query = {'_id': new ObjectID(request.params.roleId)},
                updateObj = {
                    $set: {
                        id: role.id,
                        name: role.name,
                        description: role.description,
                        updatedAt: new Date(),
                        updatedBy: userName
                    }
                };

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('roles').updateOne(query, updateObj, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        db.collection('roles').findOne(query, function (error, role) {
                            response.json({role: role});
                        });
                    }
                });
            });
        }
    }
})();
