(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.services.configurationService', [])
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['$q', '$http', 'auth'];
    function ConfigService($q, $http, auth) {
        var self = this;

        return {
            listGroups: listGroups,
            getGroupConfig: getGroupConfig,
            cacheConfig: cacheConfig,
            getCachedConfig: getCachedConfig,
            newGroupConfig: newGroupConfig,
            updateConfig: updateConfig,
            deleteGroupConfig: deleteGroupConfig,
            getConfigurableLanguages: getConfigurableLanguages
        };

        function listGroups() {
            return $http
                .get('api/config/list')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.data.error;
                });
        }

        function getGroupConfig(groupId) {
            return $http
                .get('api/config/:groupId'.replace(':groupId', groupId))
                .then(function (response) {
                    return response.data.groupConfig;
                }, function (response) {
                    return response.data.error;
                });
        }

        function cacheConfig(config) {
            self.config = config;
        }

        function getCachedConfig() {
            return self.config;
        }

        function newGroupConfig(planConfig) {
            return $http
                .post('api/config/', {
                    config: planConfig,
                    userName: auth.currentUser().auth.userName
                }, {})
                .then(function (response) {
                    return response.data.group;
                }, function (response) {
                    return $q.reject(response.data.error);
                });
        }

        function updateConfig(config, groupId) {
            return $http
                .post('api/config/:groupId'.replace(':groupId', groupId || 'root'), {
                    config: config,
                    userName: auth.currentUser().auth.userName
                }, {})
                .then(function (response) {
                    return response.data.group;
                }, function (response) {
                    return response.error;
                });
        }

        function deleteGroupConfig(groupId) {
            return $http
                .delete('api/config/:groupId'.replace(':groupId', groupId))
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        }

        function getConfigurableLanguages() {
            return [
                {id: 'english', value: 'English'},
                {id: 'spanish', value: 'Spanish'},
                {id: 'french', value: 'French'}
            ];
        }
    }
})();
