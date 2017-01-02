(function () {
    'use strict';

    var mongodb = require('mongodb').MongoClient,
        passport = require('passport'),
        dbConfig = require('../config/dbConfig')();

    module.exports = function (authService, nav) {
        var signUp = function (request, response) {
            var user = request.body;

            var url = dbConfig.dbConnectionUrl();

            mongodb.connect(url, function (error, db) {
                var usersCollection = db.collection('users');

                usersCollection.insert(user, function (error, results) {
                    request.login(results.ops[0], function () {
                        response.json({user: results.ops[0]});
                    });
                });
            });
        };

        var authenticate = passport.authenticate('local', {
            failureRedirect: '/'
        });


        var signIn = function (request, response) {
            response.json({user: request.user});
        };

        var middleware = function (request, response, next) {
            if (!request.user) {
                response.redirect('/');
            } else {
                next();
            }
        };

        var profile = function (request, response) {
            console.log(request.user);
            response.json({user: request.user});
        };

        return {
            signUp: signUp,
            authenticate: authenticate,
            signIn: signIn,
            middleware: middleware,
            profile: profile
        };
    };
})();
