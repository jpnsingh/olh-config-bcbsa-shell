(function () {
    'use strict';
    var mongodb = require('mongodb').MongoClient,
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

            mongodb.connect(connectionString, function (error, db) {
                db.collection('users').insertOne(user, function (error, results) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        response.json({user: results.ops[0]});
                    }
                });
            });
        }

        function listUsers(request, response, next) {
            var query = {};

            mongodb.connect(connectionString, function (error, db) {
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
                query = {'_id': request.params.userId},
                updateObj = {$set: {user: user, updatedAt: new Date(), updatedBy: userName}};

            mongodb.connect(connectionString, function (error, db) {
                db.collection('users').updateOne(query, updateObj, function (error, result) {
                    if (error) {
                        next(error);
                    }

                    if (result.matchedCount === 1 && result.modifiedCount === 1) {
                        response.json({user: user});
                    }
                });
            });
        }
    }
})();
