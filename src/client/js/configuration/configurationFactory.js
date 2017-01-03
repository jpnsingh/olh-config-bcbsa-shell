(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.services.configurationFactory', [])
        .factory('ConfigFactory', ConfigFactory);

    ConfigFactory.$inject = ['$q', '$timeout'];
    function ConfigFactory($q, $timeout) {
        return {
            getDefaultConfig: getDefaultConfig
        };

        function getDefaultConfig() {
            var defaultConfig = {
                    planSetup: {
                        name: 'Plan Setup',
                        branding: {
                            header: 'Branding',
                            planInfo: {
                                title: 'Plan Title'
                            },
                            colorTheme: ['red', 'green', 'blue'],
                            language: {
                                multilingual: true,
                                languages: ['English', 'Spanish']
                            },
                            logo: {
                                url: ''
                            },
                            background: {
                                imageUrl: ''
                            }
                        },
                        support: {
                            name: 'Support Personnel Name',
                            contactNumber: 'Support Contact Number',
                            hours: 'Support Hours'
                        },
                        notifications: {
                            configurable: false
                        }
                    }
                },
                deferredPromise = $q.defer();

            $timeout(function () {
                return deferredPromise.resolve(defaultConfig);
            }, 1000);

            return deferredPromise.promise;
        }
    }
})();
