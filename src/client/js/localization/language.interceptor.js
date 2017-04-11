'use strict';

export function LanguageInterceptor(languageService) {
    return {
        request: function (config) {
            let lang = languageService.getLanguage();

            if (lang) {
                config.headers = config.headers || {};
                config.headers.language = lang;
            }

            return config;
        }
    };
}

LanguageInterceptor.$inject = ['languageService'];
