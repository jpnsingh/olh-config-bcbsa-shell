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
                var url = dbConfig.dbConnectionUrl();

                mongodb.connect(url, function (error, db) {
                    var usersCollection = db.collection('users');

                    usersCollection.findOne({
                        'auth.userName': userName,
                        'auth.password': password
                    }, {_id: 0, 'auth.password': 0}, function (error, user) {
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
