(function () {
    'use strict';

    module.exports = defaultStateRun;

    defaultStateRun.$inject = ['$rootScope'];
    function defaultStateRun($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.title = 'BCBSA Shell | ' + toState.docTitle;
        });
    }
})();
