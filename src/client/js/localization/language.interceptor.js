(function () {
    'use strict';

    module.exports = LanguageInterceptor;

    LanguageInterceptor.$inject = ['languageService'];

    function LanguageInterceptor(languageService) {
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
})();
