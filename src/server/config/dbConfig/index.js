(function () {
    'use strict';

    var config = require('config');

    module.exports = DBConfig;

    function DBConfig() {
        return {
            dbConnectionString: dbConnectionString
        };

        function dbConnectionString() {
            return config.db.hostUrl + '/' + config.db.name;
        }
    }
})();
