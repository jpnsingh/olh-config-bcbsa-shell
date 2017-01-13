(function () {
    'use strict';

    module.exports = UserFn;

    function UserFn() {
        var User = function (user) {
            this._id = user._id;
            this.auth.userName = user.auth.userName;
            this.auth.password = user.auth.password;
            this.auth.grantType = user.auth.grantType;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.dob = user.dob;
            this.email = user.email;
            this.createdAt = user.createdAt;
            this.updatedAt = user.updatedAt;
            this.roles = user.roles;
            this.group = user.group;
        };

        User.prototype.login = function () {
            console.log('User Login');
        };

        User.prototype.register = function () {
            console.log('User Register');
        };

        return User;
    }
})();
