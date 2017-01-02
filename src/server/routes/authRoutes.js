(function () {
    'use strict';

    var authRouter = require('express').Router(),
        authController = require('../controllers/authController')(null, {});

    module.exports = function () {
        authRouter
            .route('/register')
            .post(authController.register);

        authRouter
            .route('/login')
            .post(authController.authenticate, authController.login);

        authRouter
            .route('/profile')
            .all(authController.middleware)
            .get(authController.profile);

        return authRouter;
    };
})();
