(function () {
    'use strict';

    var mongodb = require('mongodb').MongoClient,
        passport = require('passport'),
        dbConfig = require('../config/dbConfig')();

    module.exports = AuthController;

    function AuthController() {
        return {
            authenticate: passport.authenticate('local', {failureRedirect: '/'}),
            middleware: middleware,
            login: login,
            register: register
        };

        function register(request, response) {
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
        }

        function login(request, response) {
            response.json({user: request.user});
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
