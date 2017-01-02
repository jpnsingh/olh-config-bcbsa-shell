(function () {
    'use strict';

    var config = require('config');

    module.exports = function () {
        function dbConnectionUrl() {
            return config.db.hostUrl + '/' + config.db.dbName;
        }

        return {
            dbConnectionUrl: dbConnectionUrl
        };
    };
})();
