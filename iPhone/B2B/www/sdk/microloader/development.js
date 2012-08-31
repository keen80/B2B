/*

This file is part of Sencha Touch 2

Copyright (c) 2012 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Sencha Blink - Development
 * @author Jacky Nguyen <jacky@sencha.com>
 */
(function() {
    HH.log("* Loaded: development.js");
    function write(content) {
        document.write(content);
    }

    function meta(name, content) {
        write('<meta name="' + name + '" content="' + content + '">');
    }

    /* HH i18n implementation */
    var language_string = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage;
    if(_(['en-US', 'it']).contains(language_string)){
        write('<script src="i18n/B2B-'+language_string+'.js"></'+'script>');
    }else{
        write('<script src="i18n/B2B-en-US.js"></'+'script>');
    }

    if( _.str.include(language_string, "it")){
        moment.lang(language_string);
    }else{
        moment.lang("en");
    }

    if (navigator.onLine){
        HH.log("---+ Check: Online, Startup Start");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'app.json', false);
        xhr.send(null);

        var options = eval("(" + xhr.responseText + ")"),
            scripts = options.js || [],
            styleSheets = options.css || [],
            i, ln, path;

        meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
        meta('apple-mobile-web-app-capable', 'yes');
        meta('apple-touch-fullscreen', 'yes');

        for (i = 0,ln = styleSheets.length; i < ln; i++) {
            path = styleSheets[i];

            if (typeof path != 'string') {
                path = path.path;
            }

            write('<link rel="stylesheet" href="'+path+'">');
        }

        for (i = 0,ln = scripts.length; i < ln; i++) {
            path = scripts[i];

            if (typeof path != 'string') {
                path = path.path;
            }

            write('<script src="'+path+'"></'+'script>');
        }
        HH.log("---> Step: Online, Startup End");
    }else{
        HH.log("---+ Check: Offline, alert fired.");
        alert("We are sorry, but this application cannot start without an Internet Connection.");
    }



})();

