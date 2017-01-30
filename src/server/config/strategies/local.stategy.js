(function () {
    'use strict';

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongodb = require('mongodb').MongoClient,
        dbConfig = require('../dbConfig')();

    module.exports = Strategy;

    function Strategy() {
        passport.use(new LocalStrategy(
            {
                usernameField: 'userName',
                passwordField: 'password'
            },
            function (userName, password, done) {
                mongodb.connect(dbConfig.dbConnectionString(), function (error, db) {
                    var query = {
                            'auth.userName': userName,
                            'auth.password': password
                        },
                        projection = {_id: 0, 'auth.password': 0};

                    db.collection('users')
                        .findOne(query, projection, function (error, user) {
                            if (error) {
                                return done(error);
                            }

                            if (!user) {
                                return done(null, false, {message: 'Username or password entered is incorrect'});
                            }

                            return done(null, user);
                        });
                });
            }
        ));
    }
})();
