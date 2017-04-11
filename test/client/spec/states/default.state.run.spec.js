'use strict';

import {DefaultStateRun} from '../../../../src/client/js/states/default.state.run';

describe('DefaultStateRun', () => {
    let $rootScope,
        $state,
        auth,
        defaultStateRun;

    beforeEach(() => {
        $rootScope = jasmine.createSpyObj('$rootScope', ['$on']);
        $state = jasmine.createSpyObj('$state', ['go']);
        auth = jasmine.createSpyObj('auth', ['isAuthenticated', 'logout']);
        defaultStateRun = new DefaultStateRun($rootScope, $state, auth);
    });

    it('should have called the $rootScope.$on 4 times', () => {
        expect($rootScope.$on.calls.count()).toBe(4);
    });

    describe('on $stateChangeStart', () => {
        it('should check for authentication', () => {
            var eventFunction = $rootScope.$on.calls.first().args[1];
            eventFunction(
                {
                    preventDefault: angular.noop
                },
                {name: 'test'}
            );

            expect(auth.isAuthenticated).toHaveBeenCalled();
        });

        it('should call logout if not authenticated', () => {
            auth.isAuthenticated.and.returnValue(false);

            var eventFunction = $rootScope.$on.calls.first().args[1];
            eventFunction({
                    preventDefault: () => {
                    }
                },
                {name: 'test'}
            );

            expect(auth.isAuthenticated).toHaveBeenCalled();
            expect(auth.logout).toHaveBeenCalled();
        });

        it('should not call logout if authenticated', () => {
            auth.isAuthenticated.and.returnValue(true);

            var eventFunction = $rootScope.$on.calls.first().args[1];
            eventFunction({
                    preventDefault: () => {
                    }
                },
                {name: 'test'}
            );

            expect(auth.isAuthenticated).toHaveBeenCalled();
            expect(auth.logout).not.toHaveBeenCalled();
        });
    });

    describe('on stateChangeSuccess', () => {
        it('should set the data.docTitle accordingly on root scope', () => {
            var eventFunction = $rootScope.$on.calls.argsFor(1)[1]; // Second call for $rootScope.$on is for success
            eventFunction({}, {data: {docTitle: 'Test'}});

            expect($rootScope.title).toEqual('BCBSA Shell | Test')
        });
    });

    describe('on stateNotFound', () => {
        it('should navigate to 404', () => {
            var eventFunction = $rootScope.$on.calls.mostRecent().args[1];
            eventFunction();

            expect($state.go).toHaveBeenCalledWith('404');
        });
    });

});
