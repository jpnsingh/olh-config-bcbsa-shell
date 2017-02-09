(function () {
    'use strict';

    var mongodb = require('mongodb').MongoClient,
        passport = require('passport'),
        dbConfig = require('../config/dbConfig')();

    module.exports = AuthController;

    function AuthController() {
        return {
            authenticateAndLogin: authenticateAndLogin,
            middleware: middleware,
            register: register
        };


        function authenticateAndLogin(request, response, next) {
            passport.authenticate('local', function (error, user, info) {
                if (error) {
                    return next(error);
                }

                if (!user) {
                    return response.status(401).json({error: info});
                }

                request.login(user, function (error) {
                    if (error) {
                        return next(error);
                    }

                    return response.json({user: request.user});
                });
            })(request, response, next);
        }

        function register(request, response) {
            var user = request.body,
                userNameRegex = new RegExp(['^', user.auth.userName, '$'].join(''), 'i'),
                checkExistingUser = {'auth.userName': userNameRegex};

            mongodb.connect(dbConfig.dbConnectionString(), function (error, db) {
                db.collection('users').findOne(checkExistingUser, function (error, existingUser) {
                    if (existingUser) {
                        return response.status(409).json({error: {message: 'Username is already existing, please choose a different one!'}});
                    } else {
                        user.createdAt = new Date();
                        user.updatedAt = new Date();
                        user.auth.grantType = 'password';
                        user.roles = [{id: 'PlanAdmin'}];

                        db.collection('users').insert(user, function (error, results) {
                            request.login(results.ops[0], function () {
                                response.json({user: results.ops[0]});
                            });
                        });
                    }
                });
            });
        }

        function middleware(request, response, next) {
            if (!request.user) {
                response.redirect('/');
            } else {
                next();
            }
        }
    }
})();
