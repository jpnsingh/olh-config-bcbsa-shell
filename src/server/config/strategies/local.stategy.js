(function () {
    'use strict';

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongodb = require('mongodb').MongoClient,
        dbConfig = require('../dbConfig')();

    module.exports = function () {
        passport.use(new LocalStrategy(
            {
                usernameField: 'userName',
                passwordField: 'password'
            },
            function (userName, password, done) {
                var url = dbConfig.dbConnectionUrl();

                mongodb.connect(url, function (error, db) {
                    var usersCollection = db.collection('users');

                    usersCollection.findOne({'auth.userName': userName}, function (error, result) {
                        if (result && result.auth.password === password) {
                            done(null, result);
                        } else {
                            done(null, false, {message: 'Username or password entered is incorrect!'});
                        }
                    });
                });
            }
        ));
    };
})();
