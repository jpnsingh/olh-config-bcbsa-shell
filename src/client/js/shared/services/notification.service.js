(function () {
    'use strict';

    module.exports = NotificationService;

    NotificationService.$inject = ['$filter'];
    function NotificationService($filter) {
        var FADE_TIME_IN_SECONDS = 3;
        var self = this;

        self.hideCurrentDismissables = function () {
            $('.smk-alert').hide();
        };

        self.displayInfo = function (message, isPermanent) {
            displayAlert({
                text: message,
                type: 'info',
                permanent: isPermanent || false
            });
        };

        self.displayWarning = function (message, isPermanent) {
            displayAlert({
                text: message,
                type: 'warning',
                permanent: isPermanent || false
            });
        };

        self.displaySuccess = function (message, isPermanent) {
            displayAlert({
                text: message,
                type: 'success',
                permanent: isPermanent || false
            });
        };

        self.displayDefaultSuccess = function () {
            self.displaySuccess($filter('translate')('notifications.InformationHasBeenSaved'));
        };

        self.displayError = function (message, isPermanent) {
            displayAlert({
                text: message,
                type: 'danger',
                permanent: isPermanent || false
            });
        };

        self.displayServerErrors = function (data) {
            if (data.errors) {
                self.hideCurrentDismissables();
                self.displayError(buildErrorMessages(data.errors), true);
            }
        };

        function displayAlert(config) {
            config.text = config.text || 'Server error message missing!';
            config.classname = 'text-xs';

            $.smkAlert(angular.extend({
                time: FADE_TIME_IN_SECONDS
            }, config));

            $('.smk-alert-content').on('mousedown', function (/*event*/) {
                return false;
            });
        }

        function buildErrorList(errors) {
            var html = '<ul>';
            for (error of errors) {
                html += `<li>${error}</li>`;
            }
            return html += '</ul>';
        }

        function processFlattenedErrors(errors) {
            if (errors.length > 1) {
                return buildErrorList(errors);
            } else if (errors.length === 1) {
                return errors[0];
            } else {
                return 'Invalid server error response!';
            }
        }

        function buildErrorMessages(errorObject) {
            if (errorObject.errors) {
                errorObject.errors = _.flatten(errorObject.errors, true);
                return processFlattenedErrors(errorObject.errors);
            } else {
                return errorObject;
            }
        }
    }
})();
