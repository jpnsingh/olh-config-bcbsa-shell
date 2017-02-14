(function () {
    'use strict';

    module.exports = defaultStateRun;

    defaultStateRun.$inject = ['$rootScope', '$state', 'auth'];
    function defaultStateRun($rootScope, $state, auth) {
        $rootScope.$on('$stateChangeStart', function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name === 'login' || toState.name === 'register') return;

            if (!auth.isAuthenticated()) {
                event.preventDefault(); // stop current execution
                auth.logout();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, fromState, fromParams*/) {
            $rootScope.title = 'BCBSA Shell | ' + toState.data.docTitle;

            if ($('#bcbsa-navbar-top').attr('aria-expanded') === 'true') {
                $('#nav-toggle').click();
            }
        });

        $rootScope.$on('$stateChangeError', console.log.bind(console));

        $rootScope.$on('$stateNotFound', function (/*event, unfoundState, fromState, fromParams*/) {
            $state.go('404');
        });
    }
})();
