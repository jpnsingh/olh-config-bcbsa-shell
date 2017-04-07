(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared.controllers.helloWorldController', [])
        .controller('HelloWorldCtrl', HelloWorldCtrl);

    function HelloWorldCtrl() {
        let vm = this;

        vm.message = 'Hello World from Angular Controller';
    }
})();
