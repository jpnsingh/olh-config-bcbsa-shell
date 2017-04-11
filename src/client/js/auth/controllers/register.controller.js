'use strict';

export class RegisterCtrl {
    constructor($state, auth) {
        this.$state = $state;
        this.auth = auth;
    }

    register() {
        this.registering = true;

        this.auth
            .register(this.user)
            .then(user => {
                this.registering = false;
                if (user) {
                    this.$state.go('dashboard');
                }
            }, error => {
                this.registering = false;
                this.error = error;
            });
    }
}

RegisterCtrl.$inject = ['$state', 'auth'];
