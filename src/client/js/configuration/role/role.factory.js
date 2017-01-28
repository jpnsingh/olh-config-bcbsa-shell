(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.roleFactory', [])
        .factory('Role', RoleFactory);

    function RoleFactory() {
        var Role = function (_id) {
            this._id = _id;
            return this;
        };

        Role.prototype.name = function (name) {
            this.name = name;
            return this;
        };

        Role.prototype.description = function (description) {
            this.description = description;
            return this;
        };

        Role.prototype.responsibilities = function (responsibilities) {
            this.responsibilities = responsibilities;
            return this;
        };

        return Role;
    }
})();
