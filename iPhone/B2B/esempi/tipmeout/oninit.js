window.onload = function() {
    I18n.locale = TmoConfig.locale_code;
    document.addEventListener('deviceready', Tmo.onDeviceReady, false);
    document.addEventListener("resume", Tmo.onResume, false);
};
