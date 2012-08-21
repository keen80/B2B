var HH_config = {
	APP_NAME: "Meet Beer",
	APP_LOGO: "/cippa.png",
	"beergroup": 2,
	map: {
		marker: "resources/icons/icon.png",
		zoomLevel: 18
	}
}

var goingTo = {
	log: true,
	step1: function(msg){
		if(this.log) console.log(msg);
		// Autenticazione and Get Profile
		Ext.getStore('Profile_Local').load();
	},
	step2: function(msg){
		if(this.log) console.log(msg);
		//Load data from Ajax
		Ext.getStore('Profile_Ajax').load();
		Ext.getStore('Activities_Ajax').load();
	},
	step3: function(msg, toBeer, toFriend, toNotification){
		// Load Profile Defaults
		if(this.log) console.log(msg);
		/* From local Storage */
		var storeProfile = Ext.getStore("Profile_Local");
		var storeBeer = Ext.getStore('Beers_Local');
		var storeFriend = Ext.getStore('Friends_Local');
		var storeNotification = Ext.getStore('Notifications_Local');

        var dataJSON  = storeProfile.first().data;
        var displayName = utils.getDisplayName(dataJSON);
        Ext.getCmp('AboutTitlebar').setTitle(displayName);
        Ext.getCmp('appslidercontainer').setTitle('<div class="nav_slidemenu_profile"><img src="'+dataJSON.avatar+'" class="smallavatar"><span>'+displayName+'</span>');

        var preferencesForm = Ext.getCmp("userpreferencesform");
        preferencesForm.reset();
        preferencesForm.setRecord(storeProfile.first());

        B2B.app.getController('Preferences').onChangeTwitter(null, dataJSON.shareTwitter);
        B2B.app.getController('Preferences').onChangeFacebook(null, dataJSON.shareFacebook);

		storeBeer.load();
		storeFriend.load();
		storeNotification.load();

        if(toBeer || storeBeer.getCount() < 1)
        	console.log("BeerList is empty or need to be refreshed");
        	//Ext.getStore('Beers_Ajax').load();
        if(toFriend || storeFriend.getCount() < 1)
        	console.log("Friendlist is empty or need to be refreshed");
        	Ext.getStore('Friends_Ajax').load();
        if(toNotification || storeNotification.getCount() < 1)
        	console.log("NotificationList is empty or need to be refreshed");
        	Ext.getStore('Notifications_Ajax').load();

        Ext.get("profile_username").setHtml(storeProfile.first().data.username);
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
	

