var availableLanguages = ["en", "fr", "ru"];

function getCurrentLanguage() {
    setLanguageBasedOnDeviceIfNeeded();
    return window.localStorage.getItem('lang');
}

function setCurrentLanguage(lang) {
    setLanguageBasedOnDeviceIfNeeded();
    setLanguage(lang);
}

function setLanguageBasedOnDeviceIfNeeded(){
    if (availableLanguages.indexOf(window.localStorage.getItem('lang')) == -1) {
        var lang = navigator.language.substr(0,2);
        setLanguage(lang)
    }
}

function setLanguage(lang){
    lang = (availableLanguages.indexOf(lang) == -1) ? "en" : lang;
    window.localStorage && window.localStorage.setItem('lang', lang);
    TmoConfig.locale_code = lang;
    I18n.locale = lang;
}


TmoConfig.locale_code = getCurrentLanguage();