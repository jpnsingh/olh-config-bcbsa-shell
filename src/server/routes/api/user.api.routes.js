(function () {
    'use strict';

    var userApiRouter = require('express').Router(),
        userApiController = require('../../controllers/user.api.controller')(null, {});

    module.exports = UserApiRoutes;

    function UserApiRoutes() {
        userApiRouter
            .route('/list')
            .get(userApiController.listUsers);

        userApiRouter
            .route('/:userId/groups')
            .get(userApiController.listUserGroups);

        userApiRouter
            .route('/:userId')
            .delete(userApiController.deleteUser);

        userApiRouter
            .route('/:userId')
            .put(userApiController.updateUser);

        return userApiRouter;
    }
})();
