'use strict';

export class NotificationService {
    constructor($filter) {
        this.$filter = $filter;
        this.FADE_TIME_IN_SECONDS = 3;
    }

    hideCurrentDismissables() {
        $('.smk-alert').hide();
    }

    displayInfo(message, isPermanent) {
        this._displayAlert({
            text: message,
            type: 'info',
            permanent: isPermanent || false
        });
    }

    displayWarning(message, isPermanent) {
        this._displayAlert({
            text: message,
            type: 'warning',
            permanent: isPermanent || false
        });
    }

    displaySuccess(message, isPermanent) {
        this._displayAlert({
            text: message,
            type: 'success',
            permanent: isPermanent || false
        });
    }

    displayDefaultSuccess() {
        this.displaySuccess(this.$filter('translate')('notifications.InformationHasBeenSaved'));
    }

    displayError(message, isPermanent) {
        this._displayAlert({
            text: message,
            type: 'danger',
            permanent: isPermanent || false
        });
    }

    displayServerErrors(data) {
        if (data.errors) {
            this.hideCurrentDismissables();
            this.displayError(this._buildErrorMessages(data.errors), true);
        }
    }

    _displayAlert(config) {
        config.text = config.text || 'Server error message missing!';
        config.classname = 'text-xs';

        $.smkAlert(angular.extend({
            time: this.FADE_TIME_IN_SECONDS
        }, config));

        $('.smk-alert-content').on('mousedown', function (/*event*/) {
            return false;
        });
    }

    _buildErrorList(errors) {
        var html = '<ul>';
        for (let error of errors) {
            html += `<li>${error}</li>`;
        }
        return html += '</ul>';
    }

    _processFlattenedErrors(errors) {
        if (errors.length > 1) {
            return this._buildErrorList(errors);
        } else if (errors.length === 1) {
            return errors[0];
        } else {
            return 'Invalid server error response!';
        }
    }

    _buildErrorMessages(errorObject) {
        if (errorObject.errors) {
            errorObject.errors = _.flatten(errorObject.errors, true);
            return this._processFlattenedErrors(errorObject.errors);
        } else {
            return errorObject;
        }
    }
}

NotificationService.$inject = ['$filter'];
