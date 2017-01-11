(function () {
    'use strict';

    var authRouter = require('express').Router(),
        authController = require('../controllers/auth.controller')(null, {});

    module.exports = AuthRoutes;

    function AuthRoutes() {
        authRouter
            .route('/register')
            .post(authController.register);

        authRouter
            .route('/login')
            .post(authController.authenticate, authController.login);

        return authRouter;
    }
})();
