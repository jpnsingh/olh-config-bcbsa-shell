'use strict';

export class LanguageService {
    constructor($injector/*, session*/) {
        this.$injector = $injector;
    }

    getAvailableLanguages() {
        return [
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
    }

    getLanguage() {
        // let currentLang = session.get('lang');

        let currentLang = 'en';

        if (currentLang) {
            return currentLang;
        }

        // currentLang = languages[0].value;
        // session.set('lang', currentLang);
        // return session.get(currentLang);
    }

    setLanguage(langCode) {
        let lang = langCode;

        if (lang) {
            // session.set('lang', lang);
        } else {
            lang = this.getLanguage();
        }

        this.$injector.get('$translate').use(lang);
    }
}

LanguageService.$inject = ['$injector'/*, 'session',*/];
