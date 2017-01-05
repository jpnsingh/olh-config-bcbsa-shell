(function () {
    'use strict';

    module.exports = defaultStateRun;

    defaultStateRun.$inject = ['$rootScope', 'auth'];
    function defaultStateRun($rootScope, auth) {
        $rootScope.$on('$stateChangeStart', function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name === 'login' || toState.name === 'register') return;

            if (!auth.isAuthenticated()) {
                event.preventDefault(); // stop current execution
                auth.logout();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, fromState, fromParams*/) {
            $rootScope.title = 'BCBSA Shell | ' + toState.docTitle;
        });

        $rootScope.$on('$stateChangeError', console.log.bind(console));
    }
})();
