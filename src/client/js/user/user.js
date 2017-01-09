(function () {
    'use strict';

    module.exports = UserFn;

    function UserFn() {
        var User = function (user) {
            this.userName = user.userName;
            this.password = user.password;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.dob = user.dob;
            this.grantType = user.grantType;
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
