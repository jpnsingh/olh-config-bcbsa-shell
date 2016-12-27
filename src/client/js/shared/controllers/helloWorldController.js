(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared.controllers.helloWorldController', [])
        .controller('HelloWorldCtrl', function () {
            var vm = this;

            vm.message = 'Hello World from Angular Controller';
        });
})();
