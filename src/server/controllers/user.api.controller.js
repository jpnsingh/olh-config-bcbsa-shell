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
            addUser: addUser,
            listUsers: listUsers,
            updateUser: updateUser
        };

        function addUser(request, response, next) {
            var user = request.body.user,
                userName = request.body.userName;

            user.createdAt = new Date();
            user.updatedAt = new Date();
            user.updatedBy = userName;

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('users').insertOne(user, function (error, results) {
                    if (error) {
                        next(error);
                    }

                    if (results.matchedCount === 1 && results.modifiedCount === 1) {
                        response.json({user: results.ops[0]});
                    }
                });
            });
        }

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

        function updateUser(request, response, next) {
            var user = request.body.user,
                userName = request.body.userName,
                query = {'_id': new ObjectID(request.params.userId)},
                updateObj = {
                    $set: {
                        'auth.userName': user.auth.userName,
                        'auth.password': user.auth.password,
                        'roles': user.roles,
                        'groups': user.groups,
                        updatedAt: new Date(),
                        updatedBy: userName
                    }
                };

            mongodbClient.connect(connectionString, function (error, db) {
                db.collection('users').updateOne(query, updateObj, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        db.collection('users').findOne(query, function (error, user) {
                            response.json({user: user});
                        });
                    }
                });
            });
        }
    }
})();
