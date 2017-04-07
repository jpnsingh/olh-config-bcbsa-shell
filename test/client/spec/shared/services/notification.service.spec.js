(function () {
    'use strict';

    describe('NotificationService:', function () {

        var notificationService;

        beforeEach(function () {
            $.smkAlert = jasmine.createSpy('smkAlert');

            angular.mock.module('bcbsa-shell.shared.services');

            inject(function (_NotificationService_) {
                notificationService = _NotificationService_;
            });
        });

        describe('Hide the current notification ', function () {
            it(' should call hide function', function () {
                spyOn($.fn, 'hide');

                notificationService.hideCurrentDismissables();

                expect($.fn.hide).toHaveBeenCalled();
            });
        });

        describe('displayInfo function', function () {
            it('should pass the correct config to the alert widget', function () {

                notificationService.displayInfo('Woohoo!', false);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'info',
                    permanent: false,
                    classname: 'text-xs'
                });
            });

            it('should allow permanent alerts', function () {

                notificationService.displayInfo('Woohoo!', true);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'info',
                    permanent: true,
                    classname: 'text-xs'
                });
            });

            it('should turn off mousedown events', function () {

                spyOn($.fn, 'on');

                notificationService.displayInfo('Woohoo!', false);

                expect($.fn.on).toHaveBeenCalled();
                expect($.fn.on.calls.mostRecent().args[0]).toEqual('mousedown');
                expect($.fn.on.calls.mostRecent().args[1]).toBeDefined();
                var eventResult = $.fn.on.calls.mostRecent().args[1].call();
                expect(eventResult).toBeFalsy();
            });
        });

        describe('displayWarning function', function () {
            it('should pass the correct config to the alert widget', function () {

                notificationService.displayWarning('Woohoo!', false);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'warning',
                    permanent: false,
                    classname: 'text-xs'
                });
            });

            it('should allow permanent alerts', function () {

                notificationService.displayWarning('Woohoo!', true);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'warning',
                    permanent: true,
                    classname: 'text-xs'
                });
            });
        });

        describe('displaySuccess function', function () {
            it('should pass the correct config to the alert widget', function () {

                notificationService.displaySuccess('Woohoo!', false);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'success',
                    permanent: false,
                    classname: 'text-xs'
                });
            });

            it('should allow permanent alerts', function () {

                notificationService.displaySuccess('Woohoo!', true);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'success',
                    permanent: true,
                    classname: 'text-xs'
                });
            });
        });

        describe('displayError function', function () {
            it('should pass the correct config to the alert widget', function () {

                notificationService.displayError('Woohoo!', false);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'danger',
                    permanent: false,
                    classname: 'text-xs'
                });
            });

            it('should allow permanent alerts', function () {

                notificationService.displayError('Woohoo!', true);

                expect($.smkAlert).toHaveBeenCalledWith({
                    time: 3,
                    text: 'Woohoo!',
                    type: 'danger',
                    permanent: true,
                    classname: 'text-xs'
                });
            });
        });
    });
})();
