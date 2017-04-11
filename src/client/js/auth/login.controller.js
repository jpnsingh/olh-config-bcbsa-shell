'use strict';

export class LoginCtrl {
    constructor($state, auth) {
        this.$state = $state;
        this.auth = auth;
    }

    login() {
        this.loggingIn = true;

        this.auth
            .login(this.userName, this.password)
            .then(user => {
                this.loggingIn = false;
                if (user) {
                    this.$state.go('dashboard');
                }
            }, error => {
                this.loggingIn = false;
                this.error = error;
            });
    }
}

LoginCtrl.$inject = ['$state', 'auth'];
