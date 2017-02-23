(function () {
    'use strict';

    module.exports = [
        'languageService',
        function (languageService) {
            return {
                request: function (config) {
                    var lang = languageService.getLanguage();
                    if (lang) {
                        config.headers = config.headers || {};
                        config.headers.language = lang;
                    }
                    return config;
                }
            };
        }
    ];
})();
