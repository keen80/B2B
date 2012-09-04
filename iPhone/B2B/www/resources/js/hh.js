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
		HH.log("---> Step: "+msg);
		Ext.getStore('Profile_Local').load();
	},
	step2: function(msg){
		HH.log("---> Step: "+msg);
		Ext.getStore('Profile_Ajax').load();
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
			Ext.getStore('Beers_Ajax').load(); */
		if(toFriend || storeFriend.getCount() < 1)
			HH.log("---> Step: Store_Friend is empty or need to be refreshed");
			Ext.getStore('Friends_Ajax').load();
		if(toNotification || storeNotification.getCount() < 1)
			HH.log("---> Step: Store.Notification is empty or need to be refreshed");
			Ext.getStore('Notifications_Ajax').load();
	},
	setupDisplayName: function(profile){

		var myLastDrink = Ext.getStore("Drinks_Local").first();

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

/* Utils Global Object*/
var utils = {
	/* translate f() a la wordpress */
	__:	function(CONST_String){
		if ( _.isUndefined(CONST_String)) CONST_String = "";
		for (var i = arguments.length - 1; i >= 1; i--) {
			CONST_String = CONST_String.replace("%"+i, arguments[i]);
		};
		return CONST_String;
	},
	checkConnection: function(){
		if(!(navigator.online&&google)){
			if(i18n){
				return true;
			}else {
				alert(i18n.app.HINT_OFFLINE);
			};
			
			return false;
		}else{ return true}
	},
	getDate: function(date){
		/* TODO: MOMENT INTEGRATION date */
		var date = "5 min";
		return date;
	},
	getDrinkString: function(){
		switch(values.rate){
			case 0:
				return this.__(i18n.app.DRINK_TEXT_1_1, values.beerName, values.placeName);
				break;
			case 1:
				return this.__(i18n.app.DRINK_TEXT_1_2, values.beerName, values.placeName);
				break;
			case 2:
				return this.__(i18n.app.DRINK_TEXT_1_3, values.beerName, values.placeName);
				break;
			case 3:
				return this.__(i18n.app.DRINK_TEXT_1_4, values.beerName, values.placeName);
				break;
			case 4:
				return this.__(i18n.app.DRINK_TEXT_1_5, values.beerName, values.placeName);
				break;
			case 5:
				return this.__(i18n.app.DRINK_TEXT_1_6, values.beerName, values.placeName);
				break;
			default:
				return this.__(i18n.app.DRINK_TEXT_1_0, values.beerName, values.placeName);
				break;
		}
	},
	getActivityString: function(values){
		switch(values.type){
			case 0:
				return this.__(i18n.app.ACTIVITY_TEXT_0_1, values.displayName, values.friendName);
				break;
			case 1:
				return this.__(i18n.app.ACTIVITY_TEXT_1_1, values.displayName, values.beerName, values.placeName);
				break;
			case 2:
				return this.__(i18n.app.ACTIVITY_TEXT_2_1, values.username, values.friendname);
				break;
			default:
				return this.__(i18n.app.ACTIVITY_TEXT_0_0, values.username, values.friendname);
				break;
		}
	},
	getNotificationString: function(values){
		switch(values.type){
			case 0:
				return this.__(i18n.app.NOTIFICATION_TEXT_0_1, values.friendName);
				break;
			case 1:
				return this.__(i18n.app.NOTIFICATION_TEXT_1_1, values.friendName);
				break;
			case 2:
				return this.__(i18n.app.NOTIFICATION_TEXT_2_1, values.friendName);
				break;
			case 3:
				return this.__(i18n.app.NOTIFICATION_TEXT_3_1, values.beerName, values.targetName);
				break;
			default:
				return this.__(i18n.app.NOTIFICATION_TEXT_0_0, values.friendName);
				break;
		}
	},
	getDisplayName: function(json){
		if (json.displayName){
			return json.displayName;
		} else if(json.firstName && json.lastName){
			return json.firstName + " " + ((json.lastName).charAt(0)).toUpperCase() + ".";
		}else if(json.firstName){
			return json.firstName;
		} else {
			return json.username;
		}
	},
	getHumanDate: function(date){
		var seconds = Math.floor(((new Date().getTime()/1000) - date)),
		interval = Math.floor(seconds / 31536000);
		if (interval > 1) return interval + "y";
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) return interval + "m";
		interval = Math.floor(seconds / 86400);
		if (interval >= 1) return interval + "d";
		interval = Math.floor(seconds / 3600);
		if (interval >= 1) return interval + "h";
		interval = Math.floor(seconds / 60);
		if (interval > 1) return interval + "m ";
		return Math.floor(seconds) + "s";
	},
	getReverseGeo: function(lat, lon, what){
		var locationString = "";
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, lon);
		if(geocoder){
		    geocoder.geocode({"latLng": latlng}, function (results, status) {
		         if (status == google.maps.GeocoderStatus.OK ) {
		         	if(typeof( what ) != "undefined"){
		         		what.setHtml(results[0].formatted_address);
		         	}
		         }
			});
		}
	},
	getCountryFromCode: function(value){
		return (_.find(i18n.countries, function(state){ return state.value === value.toUpperCase();})||"").text;
	},
	getCodeFromCountry: function(text){
		return (_.find(i18n.countries, function(state){ return state.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBeerStyleFromCode: function(value) {
		return (_.find(i18n.beerstyles, function(style){ return style.value === value;})||"").text;
	},
	getBeerCodeFromStyle: function(text) {
		return (_.find(i18n.beerstyles, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getBeerTypeFromCode: function(value) {
		return (_.find(i18n.beertypes, function(type){ return type.value === value;})||"").text;
	},
	getBeerCodeFromType: function(text) {
		return (_.find(i18n.beertypes, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	},
	getLocationCategoryFromCode: function(value) {
		return (_.find(i18n.locationCategory, function(type){ return type.value === value;})||"").text;
	},
	getCodeFromLocationCategory: function(text) {
		return (_.find(i18n.locationCategory, function(code){ return code.text.toUpperCase() === text.toUpperCase();})||"").value;
	}
}

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