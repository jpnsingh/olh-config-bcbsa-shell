'use strict';

export class LogoutCtrl {
    constructor(auth) {
        this.auth = auth;
        this.logout();
    }

    logout() {
        this.auth.logout();
    }
}

LogoutCtrl.$inject = ['auth'];
