(function () {
    'use strict';
    var mongodb = require('mongodb'),
        ObjectID = mongodb.ObjectID,
        mongodbClient = mongodb.MongoClient,
        dbConfig = require('../config/dbConfig')();

    module.exports = UserApiController;

    function UserApiController() {
        var connectionString = dbConfig.dbConnectionString();

        return {
            listUsers: listUsers,
            listUserGroups: listUserGroups,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function listUsers(request, response, next) {
            var query = {};

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('users').find(query).toArray(function (error, users) {
                    if (error) {
                        next(error);
                    }

                    response.json({users: users});
                });
            });
        }

        function listUserGroups(request, response, next) {
            var userId = request.params.userId,
                query = {_id: new ObjectID(userId)},
                projection = {_id: 0, groups: 1};

            mongodbClient.connect(connectionString, function (error, db) {
                if (error) {
                    next(error);
                }

                db.collection('users').findOne(query, projection, function (error, user) {
                    response.json({groups: user.groups});
                });
            });
        }

        function deleteUser(request, response, next) {
            var userId = request.params.userId,
                query = {_id: new ObjectID(userId)};

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('users').deleteOne(query, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.deletedCount === 1) {
                        response.json({success: {deleted: 1}});
                    }
                });
            });
        }

        function updateUser(request, response, next) {
            var user = request.body.user,
                userId = request.params.userId,
                userName = request.body.userName,
                query = {'_id': userId === 'new' ? new ObjectID() : new ObjectID(userId)},
                updateObj = {
                    $set: {
                        'auth.userName': user.auth.userName,
                        'auth.password': user.auth.password,
                        'roles': user.roles,
                        'groups': user.groups,
                        updatedAt: new Date(),
                        updatedBy: userName
                    }
                },
                updateOptions = {
                    upsert: true
                };

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('users').updateOne(query, updateObj, updateOptions, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if ((result.matchedCount === 1 && result.modifiedCount === 1) || result.upsertedCount === 1) {
                        db.collection('users').findOne(query, function (error, user) {
                            response.json({user: user});
                        });
                    }
                });
            });
        }
    }
})();
