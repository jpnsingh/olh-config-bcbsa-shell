'use strict';

export class ConfigService {
    constructor($q, $http, auth) {
        this.$q = $q;
        this.$http = $http;
        this.auth = auth;
    }

    listGroups() {
        return this.$http
            .get('api/config/list')
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.data.error;
            });
    }

    getGroupConfig(groupId) {
        return this.$http
            .get(`api/config/${groupId}`)
            .then(function (response) {
                return response.data.groupConfig;
            }, function (response) {
                return response.data.error;
            });
    }

    cacheConfig(config) {
        this.config = config;
    }

    getCachedConfig() {
        return this.config;
    }

    newGroupConfig(planConfig) {
        return this.$http
            .post('api/config/', {
                config: planConfig,
                userName: this.auth.currentUser().auth.userName
            }, {})
            .then(function (response) {
                return response.data.group;
            }, function (response) {
                return this.$q.reject(response.data.error);
            });
    }

    updateConfig(config, groupId) {
        return this.$http
            .post(`api/config/${groupId}`, {
                config: config,
                userName: this.auth.currentUser().auth.userName
            }, {})
            .then(function (response) {
                return response.data.group;
            }, function (response) {
                return response.error;
            });
    }

    deleteGroupConfig(groupId) {
        return this.$http
            .delete(`api/config/${groupId}`)
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    }

    getConfigurableLanguages() {
        return [
            {id: 'english', value: 'English'},
            {id: 'spanish', value: 'Spanish'},
            {id: 'french', value: 'French'}
        ];
    }
}

ConfigService.$inject = ['$q', '$http', 'auth'];
