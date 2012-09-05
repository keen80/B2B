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
	getActivityString: function(values){
		var str;
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
		return str;
	},
	getNotificationString: function(values){
		var str;
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
		return str;
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
	generateToken: function(data, store, viewport) {
		if (data && store && viewport) {
			viewport.setMasked(true);
			if (_.isEmpty(data.token)) {
				Ext.Ajax.request({
					//url: "http://192.168.1.161:8080/birrettaservice/rest/bserv/login",
					url: "http://192.168.1.7:8080/birrettaservice/rest/bserv/generaToken",
					method: "POST",
					params: {
						idUser: data.idUser
					},
					success: function(result) {
						var json = Ext.decode(result.responseText, true);
						if (json && json.response.status.code < 200) {
							viewport.setMasked(false);
							var token = json.response.body.list[0].btSid;
							HH.log("---> Step: Generate Token Success");
							store.first().set("token", token);
							// store.sync();
							// Ext.getStore("Profile_Local").first().data.token =
							goingTo.step2("Loading Store.Profile_Ajax");
							viewport.removeAll(true, true);
							viewport.add(Ext.create('B2B.view._App'));
						} else {
							HH.log("--> Step: Generate token failure - CODE: " + json.response.status.code);
							utils.title(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
						}
					},
					failure: function(result) {
						HH.log("---> Step: Generate token failure");
						utils.title(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
					}
				});
			} else {
				viewport.setMasked(false);
				HH.log("---+ Check: ProfileStore OK, loading view._App");
				goingTo.step2("Loading Store.Profile_Ajax");
				viewport.removeAll(true, true);
				viewport.add(Ext.create('B2B.view._App'));
			}
		}
	},
	alert: function(title, message) {
		if (navigator && navigator.notification) {
			navigator.notification.alert(message, null, title);
		} else {
			alert(message);
		}
	}
}