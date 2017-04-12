'use strict';

describe('NotificationService:', () => {

    let notificationService;

    beforeEach(() => {
        $.smkAlert = jasmine.createSpy('smkAlert');

        angular.mock.module('bcbsa-shell.shared');

        inject((_NotificationService_) => {
            notificationService = _NotificationService_;
        });
    });

    describe('Hide the current notification ', () => {
        it(' should call hide function', () => {
            spyOn($.fn, 'hide');

            notificationService.hideCurrentDismissables();

            expect($.fn.hide).toHaveBeenCalled();
        });
    });

    describe('displayInfo', () => {
        it('should pass the correct config to the alert widget', () => {

            notificationService.displayInfo('Woohoo!', false);

            expect($.smkAlert).toHaveBeenCalledWith({
                time: 3,
                text: 'Woohoo!',
                type: 'info',
                permanent: false,
                classname: 'text-xs'
            });
        });

        it('should allow permanent alerts', () => {

            notificationService.displayInfo('Woohoo!', true);

            expect($.smkAlert).toHaveBeenCalledWith({
                time: 3,
                text: 'Woohoo!',
                type: 'info',
                permanent: true,
                classname: 'text-xs'
            });
        });

        it('should turn off mousedown events', () => {

            spyOn($.fn, 'on');

            notificationService.displayInfo('Woohoo!', false);

            expect($.fn.on).toHaveBeenCalled();
            expect($.fn.on.calls.mostRecent().args[0]).toEqual('mousedown');
            expect($.fn.on.calls.mostRecent().args[1]).toBeDefined();
            let eventResult = $.fn.on.calls.mostRecent().args[1].call();
            expect(eventResult).toBeFalsy();
        });
    });

    describe('displayWarning', () => {
        it('should pass the correct config to the alert widget', () => {

            notificationService.displayWarning('Woohoo!', false);

            expect($.smkAlert).toHaveBeenCalledWith({
                time: 3,
                text: 'Woohoo!',
                type: 'warning',
                permanent: false,
                classname: 'text-xs'
            });
        });

        it('should allow permanent alerts', () => {

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

    describe('displaySuccess', () => {
        it('should pass the correct config to the alert widget', () => {

            notificationService.displaySuccess('Woohoo!', false);

            expect($.smkAlert).toHaveBeenCalledWith({
                time: 3,
                text: 'Woohoo!',
                type: 'success',
                permanent: false,
                classname: 'text-xs'
            });
        });

        it('should allow permanent alerts', () => {

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

    describe('displayError', () => {
        it('should pass the correct config to the alert widget', () => {

            notificationService.displayError('Woohoo!', false);

            expect($.smkAlert).toHaveBeenCalledWith({
                time: 3,
                text: 'Woohoo!',
                type: 'danger',
                permanent: false,
                classname: 'text-xs'
            });
        });

        it('should allow permanent alerts', () => {

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
