var HH = {
	APP_NAME: "Meet Beer",
	APP_LOGO: "resources/img/logo_text.png",
	DEBUG: false,
	"beergroup": 2,
	map: {
		marker: "resources/img/pin_small.png",
		zoomLevel: 18
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
		HH.log("---> Step: Setup DisplayName thru app");
		var displayName = utils.getDisplayName(profile.data);
		Ext.get("profile_username").setHtml(profile.data.username);
        Ext.getCmp('AboutTitlebar').setTitle(displayName);
        Ext.getCmp('appslidercontainer').setTitle('<div class="nav_slidemenu_profile"><img src="'+profile.data.avatar+'" class="smallavatar"><span>'+displayName+'</span>');
	},
	setupPreferences: function(profile){
		HH.log("---> Step: Setup Preferences");
		var preferencesForm = Ext.getCmp("userpreferencesform");
        preferencesForm.reset();
        preferencesForm.setRecord(profile);
        B2B.app.getController('Preferences').onChangeTwitter(null, profile.data.shareTwitter);
        B2B.app.getController('Preferences').onChangeFacebook(null, profile.data.shareFacebook);
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
	}
}

HH.log("* Loaded: HH.js");

