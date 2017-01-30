(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.services.configurationFactory', [])
        .factory('ConfigFactory', ConfigFactory);

    ConfigFactory.$inject = ['$http', 'auth'];
    function ConfigFactory($http, auth) {
        var self = this;

        return {
            getDefaultConfig: getDefaultConfig,
            cacheConfig: cacheConfig,
            getCachedConfig: getCachedConfig,
            updateConfig: updateConfig,
            getConfigurableLanguages: getConfigurableLanguages
        };

        function getDefaultConfig(groupId) {
            return $http
                .get('api/config/:groupId'.replace(':groupId', groupId || 'root'))
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

        function getConfigurableLanguages() {
            return [
                {id: 'english', value: 'English'},
                {id: 'spanish', value: 'Spanish'},
                {id: 'french', value: 'French'}
            ];
        }

        function updateConfig(config, groupId) {
            return $http
                .post('api/config/:groupId'.replace(':groupId', groupId || 'root'), {
                    config: config,
                    userName: auth.currentUser().auth.userName
                }, {})
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        }
    }
})();
