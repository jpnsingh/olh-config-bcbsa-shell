(function () {
    'use strict';

    var authRouter = require('express').Router(),
        authController = require('../controllers/authController')(null, {});

    module.exports = function () {
        authRouter
            .route('/signUp')
            .post(authController.signUp);

        authRouter
            .route('/signIn')
            .post(authController.authenticate, authController.signIn);

        authRouter
            .route('/profile')
            .all(authController.middleware)
            .get(authController.profile);

        return authRouter;
    };
})();
