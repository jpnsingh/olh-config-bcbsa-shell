(function () {
    'use strict';

    var config = require('config');

    module.exports = DBConfig;

    function DBConfig() {
        return {
            dbConnectionUrl: dbConnectionUrl
        };

        function dbConnectionUrl() {
            return config.db.hostUrl + '/' + config.db.dbName;
        }
    }
})();
