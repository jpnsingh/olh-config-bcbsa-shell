(function () {
    'use strict';

    module.exports = angular.module('bcsba-shell.configuration.plan.configPlanFactory', [])
        .factory('ConfigPlan', ConfigPlanFactory);

    ConfigPlanFactory.$inject = [];
    function ConfigPlanFactory() {
        var ConfigPlan = function () {
            this.planSetup = {
                header: 'Plan Setup',
                branding: {
                    header: 'Branding',
                    planInfo: {
                        title: 'Plan Title',
                        value: ''
                    },
                    colorTheme: {
                        themes: [
                            {id: 'red', name: 'Red'},
                            {id: 'green', name: 'Green'},
                            {id: 'blue', name: 'Blue'}
                        ],
                        selected: ''
                    },
                    logo: {
                        src: ''
                    },
                    background: {
                        default: null,
                        defaultSrc: '',
                        newSrc: ''
                    }
                },
                support: {
                    header: 'Support',
                    fields: [
                        {
                            type: 'email',
                            name: 'personEmail',
                            title: 'Support Personnel Email',
                            iconClass: 'fa fa-envelope fa-lg',
                            value: ''
                        },
                        {
                            type: 'number',
                            name: 'contactNumber',
                            title: 'Support Contact Number',
                            iconClass: 'fa fa-phone fa-lg',
                            value: null
                        },
                        {
                            type: 'text',
                            name: 'hours',
                            title: 'Support Hours',
                            iconClass: 'fa fa-clock-o fa-lg',
                            value: ''
                        }
                    ]
                },
                language: {
                    multilingual: null,
                    supported: []
                },
                notifications: {
                    configurable: null
                }
            };

            this.planAdditional = {
                newsFeed: {
                    display: {
                        label: 'No. of items to display in Feed',
                        limit: null
                    },
                    list: []
                },
                interest: {
                    list: []
                },
                insight: {
                    display: {
                        label: 'No. of items to display in Feed',
                        limit: null
                    },
                    list: []
                }
            };

            this.featurePool = {
                header: 'Feature Info',
                appPool: []
            };
        };

        return ConfigPlan;
    }
})();
