(function () {
    'use strict';

    var DefaultStateRun = require('../../../../../src/client/js/states/default.state.run');

    describe('DefaultStateRun', function () {
        var $rootScope,
            $state,
            auth,
            defaultStateRun;

        beforeEach(function () {
            $rootScope = jasmine.createSpyObj('$rootScope', ['$on']);
            $state = jasmine.createSpyObj('$state', ['go']);
            auth = jasmine.createSpyObj('auth', ['isAuthenticated', 'logout']);
            defaultStateRun = new DefaultStateRun($rootScope, $state, auth);
        });

        it('should have called the $rootScope.$on 4 times', function () {
            expect($rootScope.$on.calls.count()).toBe(4);
        });

        describe('on $stateChangeStart', function () {
            it('should check for authentication', function () {
                var eventFunction = $rootScope.$on.calls.first().args[1];
                eventFunction(
                    {
                        preventDefault: function () {
                        }
                    },
                    {name: 'test'}
                );

                expect(auth.isAuthenticated).toHaveBeenCalledWith();
            });

            it('should call logout if not authenticated', function () {
                auth.isAuthenticated.and.returnValue(false);

                var eventFunction = $rootScope.$on.calls.first().args[1];
                eventFunction({
                        preventDefault: function () {
                        }
                    },
                    {name: 'test'}
                );

                expect(auth.isAuthenticated).toHaveBeenCalledWith();
                expect(auth.logout).toHaveBeenCalledWith();
            });

            it('should not call logout if authenticated', function () {
                auth.isAuthenticated.and.returnValue(true);

                var eventFunction = $rootScope.$on.calls.first().args[1];
                eventFunction({
                        preventDefault: function () {
                        }
                    },
                    {name: 'test'}
                );

                expect(auth.isAuthenticated).toHaveBeenCalledWith();
                expect(auth.logout).not.toHaveBeenCalledWith();
            });
        });

        describe('on stateChangeSuccess', function () {
            it('should set the docTitle accordingly on root scope', function () {
                var eventFunction = $rootScope.$on.calls.argsFor(1)[1]; // Second call for $rootScope.$on is for success
                eventFunction({}, {docTitle: 'Test'});

                expect($rootScope.title).toEqual('BCBSA Shell | Test')
            });
        });

        describe('on stateNotFound', function () {
            it('should navigate to 404', function () {
                var eventFunction = $rootScope.$on.calls.mostRecent().args[1];
                eventFunction();

                expect($state.go).toHaveBeenCalledWith('404');
            });
        });

    });
})();
