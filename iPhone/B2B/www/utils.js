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
	getUserAvatar: function(profile){
		var avatar_url = HH.default_user64;
		if(profile){
			if( !(_.isUndefined(profile.avatar) || _.isUndefined(profile.avatar)) ){
				avatar_url = profile.avatar;
			}else if ( !_.isUndefined(profile.email) ){
				avatar_url = "http://www.gravatar.com/avatar/"+md5(profile.email)+"?s=64";
			}
		}
		return avatar_url;
	},
	getProgressPoint: function(profile){
		var currentPoints = 0;
		var maxPoints = 0;
		if(profile){
			if (! (_.isNumber(parseInt(profile.currentPoints)) || _.isNumber(parseInt(profile.maxPoints)))){
				currentPoints = parseInt(profile.currentPoints);
				maxPoints = parseInt(profile.maxPoints);
				if (currentPoints < 1) { return 1 }
				if (maxPoints < 1) { return 10 }
				else{
					return Math.ceil(currentPoints * 100 / maxPoints);				} 
			}else
				return 1;
			}
		return 1;
	},
	getPointLabel: function(profile){
		var what = "todo con profile";
		var currentPoints = _.isEmpty(profile.currentPoints)?profile.currentPoints:"0"
		switch(what){
			case 0:
				return this.__(i18n.app.POINTLABEL_TEXT_0_1, currentPoints);
				break;
			default:
				return this.__(i18n.app.POINTLABEL_TEXT_0_0, currentPoints);
				break;
		};
	},
	getPointClaim: function(profile){
		var what = "todo con profile";
		switch(what){
			case 0:
				return this.__(i18n.app.POINTCLAIM_TEXT_0_1);
				break;
			default:
				return this.__(i18n.app.POINTCLAIM_TEXT_0_0);
				break;
		};
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
	},
	generateToken: function(data, store, viewport) {
		if (data && store && viewport) {
			viewport.setMasked(true);
			if (_.isEmpty(data.token)) {
				Ext.Ajax.request({
					//url: "http://192.168.1.161:8080/birrettaservice/rest/bserv/login",
					url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/generaToken",
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
