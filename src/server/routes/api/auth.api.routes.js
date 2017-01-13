(function () {
    'use strict';

    var authRouter = require('express').Router(),
        authController = require('../../controllers/auth.api.controller.js')(null, {});

    module.exports = AuthRoutes;

    function AuthRoutes() {
        authRouter
            .route('/register')
            .post(authController.register);

        authRouter
            .route('/login')
            .post(authController.authenticateAndLogin);

        return authRouter;
    }
})();
