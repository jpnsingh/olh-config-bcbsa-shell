(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.configuration.services.configurationFactory', [])
        .factory('ConfigFactory', [
            '$q', '$timeout',
            function ($q, $timeout) {
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
                };

                function getDefaultConfig() {
                    var deferredPromise = $q.defer();

                    $timeout(function () {
                        return deferredPromise.resolve(defaultConfig);
                    }, 1000);

                    return deferredPromise.promise;
                }

                return {
                    getDefaultConfig: getDefaultConfig
                };
            }
        ]);
})();
