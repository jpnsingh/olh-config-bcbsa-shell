(function () {
    'use strict';

    var mongodb = require('mongodb').MongoClient,
        passport = require('passport');

    module.exports = function (authService, nav) {
        var signUp = function (request, response) {
            var user = request.body;
            console.log(user);

            var url = 'mongodb://localhost:27017/bcbsa-shell-dev';

            mongodb.connect(url, function (error, db) {
                var usersCollection = db.collection('users');

                usersCollection.insert(user, function (error, results) {
                    request.login(results.ops[0], function () {
                        response.redirect('/');
                    });
                });
            });
        };

        var authenticate = passport.authenticate('local', {
            failureRedirect: '/'
        });


        var signIn = function (request, response) {
            response.json(request.user);
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
            response.json(request.user);
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
