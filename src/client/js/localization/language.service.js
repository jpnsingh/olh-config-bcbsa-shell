(function () {
    'use strict';

    module.exports = LanguageService;

    LanguageService.$inject = ['$injector'/*, 'session',*/];
    function LanguageService($injector/*, session*/) {
        var self = this,
            languages = [
                {
                    label: 'English',
                    value: 'en'
                },
                {
                    label: 'Español',
                    value: 'es'
                },
                {
                    label: 'français',
                    value: 'fr'
                }
            ];

        self.getAvailableLanguages = function () {
            return languages;
        };

        self.getLanguage = function () {
            // var currentLang = session.get('lang');

            var currentLang = 'en';

            if (currentLang) {
                return currentLang;
            }

            // currentLang = languages[0].value;
            // session.set('lang', currentLang);
            // return session.get(currentLang);
        };

        self.setLanguage = function (langCode) {
            var lang = langCode;

            if (lang) {
                // session.set('lang', lang);
            } else {
                lang = self.getLanguage();
            }

            $injector.get('$translate').use(lang);
        };
    }
})();
