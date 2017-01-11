(function () {
    'use strict';

    var passport = require('passport');

    module.exports = PassportConfig;

    function PassportConfig(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        require('./strategies/local.stategy')();
    }
})();
