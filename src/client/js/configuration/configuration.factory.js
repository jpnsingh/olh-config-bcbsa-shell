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
                        header: 'Plan Setup',
                        branding: {
                            header: 'Branding',
                            planInfo: {
                                title: 'Plan Title',
                                value: ''
                            },
                            colorTheme: {
                                themes: ['red', 'green', 'blue'],
                                selected: ''
                            },
                            logo: {
                                url: ''
                            },
                            background: {
                                imageUrl: ''
                            }
                        },
                        support: {
                            header: 'Support',
                            fields: [
                                {name: 'personName', title: 'Support Personnel Name', value: ''},
                                {name: 'contactNumber', title: 'Support Contact Number', value: ''},
                                {name: 'hours', title: 'Support Hours', value: ''}
                            ]
                        },
                        language: {
                            multilingual: true,
                            languages: ['English', 'Spanish']
                        },
                        notifications: {
                            configurable: false
                        }
                    },
                    planAdditional: {
                        newsFeed: {},
                        interest: {},
                        insight: {}
                    },
                    featurePool: {
                        appPool: []
                    },
                    featureAssignment: {
                        features: []
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
