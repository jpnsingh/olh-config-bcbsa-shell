(function () {
    'use strict';

    var RoleApiRouter = require('express').Router(),
        roleApiController = require('../../controllers/role.api.controller')(null, {});

    module.exports = RoleApiRoutes;

    function RoleApiRoutes() {
        RoleApiRouter
            .route('/roles')
            .get(roleApiController.getRoles);

        RoleApiRouter
            .route('/')
            .post(roleApiController.addRole);

        RoleApiRouter
            .route('/:roleId')
            .put(roleApiController.updateRole);

        return RoleApiRouter;
    }
})();
