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
            deleteRole: deleteRole,
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
                projection = {_id: 0, id: 1, name: 1, priority: 1};

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

        function deleteRole(request, response, next) {
            var roleId = request.params.roleId,
                query = {_id: new ObjectID(roleId)};

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('roles').deleteOne(query, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.deletedCount === 1) {
                        response.json({success: {deleted: 1}});
                    }
                });
            });
        }

        function updateRole(request, response, next) {
            var role = request.body.role,
                roleId = request.params.roleId,
                userName = request.body.userName,
                query = {'_id': roleId === 'new' ? new ObjectID() : new ObjectID(roleId)},
                updateObj = {
                    $set: {
                        id: role.id,
                        name: role.name,
                        description: role.description,
                        priority: role.priority,
                        updatedAt: new Date(),
                        updatedBy: userName
                    }
                },
                updateOptions = {
                    upsert: true
                };

            if (roleId === 'new') {
                updateObj.$set.createdAt = new Date();
            }

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('roles').updateOne(query, updateObj, updateOptions, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if ((result.matchedCount === 1 && result.modifiedCount === 1) || result.upsertedCount === 1) {
                        db.collection('roles').findOne(query, function (error, role) {
                            response.json({role: role});
                        });
                    }
                });
            });
        }
    }
})();
