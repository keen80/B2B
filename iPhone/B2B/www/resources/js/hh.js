/* HH i18n implementation */
var language_string = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage;

if(_(['en-US', 'it']).contains(language_string)){
    document.write('<script src="i18n/B2B-'+language_string+'.js"></'+'script>');
}

var HH = {
	SKIP_LOGIN: false,
	OFFLINE_MODE: false,
	APP_NAME: "Meet Beer",
	APP_LOGO: "resources/img/logo_text.png",
	IP_PORT_SERVER: "http://antreem.dtdns.net:8080",
	default_user32: "resources/img/default/blank_avatar_32.png",
	default_user48: "resources/img/default/blank_avatar_48.png",
	default_user64: "resources/img/default/blank_avatar_64.png",
	default_beerstyle32: "resources/img/default/blank_avatar_32.png",
	default_beergrad32: "resources/img/default/blank_avatar_32.png",
	default_place32: "resources/img/default/blank_place_32.png",
	default_place48: "resources/img/default/blank_place_48.png",
	default_place64: "resources/img/default/blank_place_64.png",
	default_badge32: "resources/img/default/blank_badge_32.png",
	default_badge64: "resources/img/default/blank_badge_64.png",
	DEBUG: true,
	"beergroup": 2,
	map: {
		marker: "resources/img/pin_small.png",
		zoomLevel: 18,
		zoomLevel2: 15
	},
	log: function(what, isError) {
		if ( this.DEBUG && !isError ) {
			console.log(what);
		} else if ( this.DEBUG && isError){
			console.error(what);
		}
	}
}

var goingTo = {
	step1: function(msg){
		HH.log("---> Step1: " + msg);
		Ext.getStore('Profile_Local').load();
	},
	step2: function(msg){
		HH.log("---> Step2: " + msg);
		var profileLocal = Ext.getStore('Profile_Local'),
			profileAjax = Ext.getStore('Profile_Ajax'),
			data = null;

		if (profileLocal && profileLocal.getCount() > 0) {
			data = profileLocal.first().data;
			profileAjax.getProxy().setExtraParam("btUsername", data.idUser);
			profileAjax.getProxy().setExtraParam("btSid", data.token);
			profileAjax.getProxy().setExtraParam("username", data.idUser);
		}

		profileAjax.load();
	},
	step3: function(msg, toBeer, toFriend, toNotification) {
		HH.log("---> Step3: " + msg);
		Ext.getStore('Activities_User_Ajax').load();
		Ext.getStore('Activities_Ajax').load();
		this.step4("Load: App Defaults from Store.Profile_Local", toBeer, toFriend, toNotification);
	},
	step4: function(msg, toBeer, toFriend, toNotification) {
		HH.log("---> Step4: " + msg);
		var storeProfile = Ext.getStore("Profile_Local"),
			storeFriend = Ext.getStore('Friends_Local'),
			storeNotification = Ext.getStore('Notifications_Local'),
			profile = null, user = null,
			storeProfileDrinks = Ext.getStore('Drinks_Ajax');

		if (storeProfile && storeProfile.getCount() > 0) {
			profile = storeProfile.first();
			user = profile.data;
        	HH.log("LOAD PROFILE FOR Drinks "+user.idUser);
        	storeProfileDrinks.getProxy().setExtraParam('idUser', user.idUser);
        	storeProfileDrinks.getProxy().setExtraParam('btUsername',user.idUser);
        	storeProfileDrinks.getProxy().setExtraParam('btSid', user.token);//user.token
        	storeProfileDrinks.load();
    	}

    	if (profile) {
    		this.setupDisplayName(profile);
			this.setupPreferences(profile);
    	}

		storeFriend.load();
		storeNotification.load();

		/*if(toBeer || storeBeer.getCount() < 1)
			console.log("BeerList is empty or need to be refreshed");
			Ext.getStore('Beers_Ajax').load();
		if(toFriend || storeFriend.getCount() < 1)
			HH.log("---> Step: Store_Friend is empty or need to be refreshed");
			Ext.getStore('Friends_Ajax').load();*/
		if(toNotification || storeNotification.getCount() < 1)
			HH.log("---> Step: Store.Notification is empty or need to be refreshed");
			Ext.getStore('Notifications_Ajax').load();
	},
	updateDisplayName: function() {
		var storeProfile = Ext.getStore("Profile_Local");

		if (storeProfile && storeProfile.getCount() > 0) {
			profile = storeProfile.first();
			this.setupDisplayName(profile);
		}
	},
	setupDisplayName: function(profile) {
		var drinksLocal = Ext.getStore("Drinks_Local"),
			latestDrink = Ext.getCmp('mylatestdrink'),
			data = (profile ? profile.data : null),
			displayName = "", title = "";
		HH.log("LATEST drink:");
		if (latestDrink && drinksLocal && drinksLocal.getCount() > 0) {
			latestDrink.setData(drinksLocal.first().data);
			//Ext.get("profile_username").setHtml(profile.data.username);
			//TODO SPOSTARE IN UN CONTROLLER
			// Ext.getCmp('AboutTitlebar').setTitle(displayName);
		}

		if (data) {
			displayName = utils.getDisplayName(data);
			HH.log("---> Step: Setup DisplayName thru app - " + displayName);
			title = '<div class="nav_slidemenu_profile"><img src="' + data.avatar +
					'" class="smallavatar"><span>' + displayName + '</span>';
			Ext.getCmp('appslider').setTitle(title);
		}
	},
	setupPreferences: function(profile){
		HH.log("---> Step: Setup Preferences");
		/*
		TODO
		var preferencesForm = Ext.getCmp("userpreferencesform");
		preferencesForm.reset();
		preferencesForm.setRecord(profile);
		B2B.app.getController('Preferences').onChangeTwitter(null, profile.data.shareTwitter);
		B2B.app.getController('Preferences').onChangeFacebook(null, profile.data.shareFacebook);
	*/
}
};

HH.log("* Loaded: HH.js");
HH.log("* Start: Before Init");

_.mixin(_.str.exports());


if(utils.checkConnection()){

	google.maps.Map.prototype.clearMarkers = function() {
	    for(var i=0; i < this.markers.length; i++){
	        this.markers[i].setMap(null);
	    }
	    this.markers = new Array();
	};
}else{
	HH.log("Cannot init clearMarkers");
}

HH.log("* END: Before Init");