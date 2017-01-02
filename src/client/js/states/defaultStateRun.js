(function () {
    'use strict';

    module.exports = function (AuthService) {
        console.log('App run');
        console.log(AuthService.getLoggedIn());
    };
})();
