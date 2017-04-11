'use strict';

export class auth {
    constructor($q, $rootScope, $http, $window, $state) {
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$window = $window;
        this.$state = $state;
    }

    clear() {
        this.$window.sessionStorage.user = JSON.stringify({});
    }

    storeUser(user) {
        this.$window.sessionStorage.user = user ? JSON.stringify(user) : {};
        this.$rootScope.$broadcast('loginEvent', user);
        return user;
    }

    currentUser() {
        return !_.isEmpty(this.$window.sessionStorage.user) ? JSON.parse(this.$window.sessionStorage.user) : {};
    }

    isAuthenticated() {
        return !_.isEmpty(this.currentUser());
    }

    logout() {
        this.clear();
        this.$state.go('login');
    }

    failureEvent(name) {
        console.log('Failed to ' + name);
        this.clear();
        this.$rootScope.$broadcast('authenticationFailed');
    }

    register(user) {
        return this.$http
            .post('/api/auth/register', user, {})
            .then(response => {
                return this.storeUser(response.data.user);
            }, response => {
                this.failureEvent('register');
                return this.$q.reject(response.data.error);
            });
    }

    login(userName, password) {
        let user = {userName: userName, password: password};
        return this.$http
            .post('/api/auth/login', user, {})
            .then(response => {
                return this.storeUser(response.data.user);
            }, response => {
                this.failureEvent('login');
                return this.$q.reject(response.data.error);
            });
    }
}

auth.$inject = ['$q', '$rootScope', '$http', '$window', '$state'];
