//location change general dispatcher
Tmo.Adapters.ChildBrowserLoc = function (loc) {
    //alert(loc);
    if (/facebook\.com/.test(loc)) {
        Tmo.Adapters.facebook.locationChanged(loc);
    } else if ((/twitter\.com/.test(loc)) || (/\/twitter\?/.test(loc))) {
        Tmo.Adapters.twitter.locationChanged(loc);
    } else {
//        alert("DISPATCHER ERROR");
//        window.plugins.childBrowser.close();
    }
};


