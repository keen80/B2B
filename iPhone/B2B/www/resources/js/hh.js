/* HH i18n implementation */
var language_string = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage;

if(_(['en-US', 'it']).contains(language_string)){
    document.write('<script src="i18n/B2B-'+language_string+'.js"></'+'script>');
}

/*else{
    document.write('<script src="i18n/B2B-en-US.js"></'+'script>');
}*/

if( _.str.include(language_string, "it")){
//    moment.lang(language_string);
}else{
//    moment.lang("en");
}


var HH = {
	APP_NAME: "Meet Beer",
	APP_LOGO: "resources/img/logo_text.png",
	"default_user32": "resources/img/default/blank_avatar_32.png",
	"default_user48": "resources/img/default/blank_avatar_48.png",
	"default_user64": "resources/img/default/blank_avatar_64.png",
	"default_beerstyle32": "resources/img/default/blank_avatar_32.png",
	"default_beergrad32": "resources/img/default/blank_avatar_32.png",
	"default_place32": "resources/img/default/blank_avatar_32.png",
	"default_badge32": "resources/img/default/blank_avatar_32.png",
	"default_badge64": "resources/img/default/blank_avatar_64.png",
	IP_PORT_SERVER: 'http://192.168.1.9:8080',
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
		} else if ( this.DEBUG && Error){
			console.error(what);
		}
	}
}

var goingTo = {
	step1: function(msg){
		HH.log("---> Step1: "+msg);
		Ext.getStore('Profile_Local').load();
	//	var profile = Ext.getStore('Profile_Local').first().data;
		var profileAjax = Ext.getStore('Profile_Ajax');
	//	profileAjax.getProxy().setExtraParam("btUsername", profile.idUser);
	//	profileAjax.getProxy().setExtraParam("btSid", profile.token);
	//	profileAjax.getProxy().setExtraParam("username", profile.username);
		profileAjax.load();
	},
	step2: function(msg){
		HH.log("---> Step2: "+msg);
		
		Ext.getStore('Activities_User_Ajax').load();
		Ext.getStore('Activities_Ajax').load();
	},
	step3: function(msg, toBeer, toFriend, toNotification){
		HH.log("---> Step: "+msg);
		var storeProfile = Ext.getStore("Profile_Local");
		var storeFriend = Ext.getStore('Friends_Local');
		var storeNotification = Ext.getStore('Notifications_Local');
		var profile = storeProfile.first();

		this.setupDisplayName(profile);
		this.setupPreferences(profile);
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
	setupDisplayName: function(profile){

		var myLastDrink = Ext.getStore("Drinks_Local").first();
		var testdata = Ext.create("B2B.model.Drink", {
		});
		Ext.getCmp('mylatestdrink').setData(myLastDrink.data);

		HH.log("---> Step: Setup DisplayName thru app");
		var displayName = utils.getDisplayName(profile.data);
		//Ext.get("profile_username").setHtml(profile.data.username);
		//TODO SPOSTARE IN UN CONTROLLER
		// Ext.getCmp('AboutTitlebar').setTitle(displayName);
		Ext.getCmp('appslider').setTitle('<div class="nav_slidemenu_profile"><img src="'+profile.data.avatar+'" class="smallavatar"><span>'+displayName+'</span>');
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