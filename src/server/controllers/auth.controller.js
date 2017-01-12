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
            try {
                response.json({user: request.user});
            } catch (error) {
                console.log(error);
                response.status(401).json({error: true, message: 'Username or password entered is incorrect'});
            }
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
