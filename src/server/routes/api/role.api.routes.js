(function () {
    'use strict';

    var RoleApiRouter = require('express').Router(),
        roleApiController = require('../../controllers/role.api.controller')(null, {});

    module.exports = RoleApiRoutes;

    function RoleApiRoutes() {
        RoleApiRouter
            .route('/list')
            .get(roleApiController.listRoles);

        RoleApiRouter
            .route('/userRoles')
            .get(roleApiController.userRoles);

        RoleApiRouter
            .route('/:roleId')
            .delete(roleApiController.deleteRole);

        RoleApiRouter
            .route('/:roleId')
            .put(roleApiController.updateRole);

        return RoleApiRouter;
    }
})();
