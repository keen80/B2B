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
			} else {
				utils.alert(i18n.app.HINT_OFFLINE, i18n.app.COMMON_ATTENTION);
			};

			return false;
		}else{ return true}
	},
	getDate: function(values){
		var date = values.insertedOn;
		if(!_.isUndefined(date)){
			return this.getHumanDate(new Date(date));
		}else{
			return i18n.app.TEXT_DATESOMETIME;
		}
	},
	getDrinkString: function(values) {
		if (values) {
			switch(values.rate){
				case 0:
					return this.__(i18n.app.DRINK_TEXT_1_1, _.titleize(values.beerName), values.placeName);
				case 1:
					return this.__(i18n.app.DRINK_TEXT_1_2, _.titleize(values.beerName), values.placeName);
				case 2:
					return this.__(i18n.app.DRINK_TEXT_1_3, _.titleize(values.beerName), values.placeName);
				case 3:
					return this.__(i18n.app.DRINK_TEXT_1_4, _.titleize(values.beerName), values.placeName);
				case 4:
					return this.__(i18n.app.DRINK_TEXT_1_5, _.titleize(values.beerName), values.placeName);
				case 5:
					return this.__(i18n.app.DRINK_TEXT_1_6, _.titleize(values.beerName), values.placeName);
				default:
					return this.__(i18n.app.DRINK_TEXT_1_0, _.titleize(values.beerName), values.placeName);
			}
		}
		return this.__(i18n.app.DRINK_TEXT_1_0, values.beerName, values.placeName);
	},
	getUserAvatar: function(profile){
		var avatar_url = HH.default_user64;
		if (profile) {
			if ( !(_.isUndefined(profile.avatar) || _.isUndefined(profile.avatar)) ) {
				avatar_url = profile.avatar;
			} else if ( !_.isUndefined(profile.email) ) {
				avatar_url = "http://www.gravatar.com/avatar/"+md5(profile.email)+"?s=64";
			}
		}
		return avatar_url;
	},
	getProgressPoints: function(profile){
		if (profile && _.isNumber(profile.currentPoints)) {
			if (profile.currentPoints < 1) {
				return 1
			}
			else{
				var max = 1;
				if (this.getMaxPoints(profile) > 0) max = this.getMaxPoints(profile);
				return Math.ceil(profile.currentPoints * 100 / max);
			}
		}
		return 1;
	},
	getMaxPoints: function(profile){
		if (profile && _.isNumber(profile.maxPoints)){
			return profile.maxPoints;
		}
		return 1;
	},
	getPointLabel: function(profile){
		var pointstatus = 0;
		var currentPoints = profile.currentPoints;
		if(currentPoints > 0){
			if (currentPoints < profile.maxPoints){
				pointstatus = 1;
			}
		};
		switch(pointstatus){
			case 1:
				return this.__(i18n.app.POINTLABEL_TEXT_0_1, currentPoints);
				break;
			default:
				return this.__(i18n.app.POINTLABEL_TEXT_0_0, currentPoints);
				break;
		};
	},
	getPointClaim: function(profile){
		var pointstatus = 0;
		
		var currentPoints = profile.currentPoints;
		/*
		if(currentPoints > 0){
			if (currentPoints < profile.maxPoints){
				pointstatus = 1;
			}
		};*/
		switch(pointstatus){
			case 1:
				return this.__(i18n.app.POINTCLAIM_TEXT_0_1, currentPoints);
				break;
			default:
				return this.__(i18n.app.POINTCLAIM_TEXT_0_0, currentPoints);
				break;
		};
	},
	getBeerColorImage: function(values){
		if (values || values.color){
			if (_.isEmpty(values)){
				if (values.beerstyle == 1 ) return 0; //chiara
				if (values.beerstyle == 7 ) return 2; // rossa
				if (values.beerstyle == 3 ) return 1; // torbida
				if (values.beerstyle == 5 ) return 1; // torbida
				if (values.beerstyle == 11 ) return 1; // torbida
				if (values.beerstyle == 4 ) return 3; // stout
				if (values.beerstyle == 10 ) return 3; // stout
			}else{
				return values.color;
			}
		}
		return 0;
	},
	getActivityString: function(values){
		switch(values.type){
			case 0:
				return this.__(i18n.app.ACTIVITY_TEXT_0_1, values.displayName, values.friendName);
				break;
			case 1:
				return this.__(i18n.app.ACTIVITY_TEXT_2_1, values.username, values.friendname);
				break;
			case 2:
				return this.__(i18n.app.ACTIVITY_TEXT_1_1, values.displayName, values.beerName, values.placeName);
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
		var seconds = Math.floor(((new Date().getTime()/1000) - date.getTime()/1000)),
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
	alert: function(message, title, confirm, callback) {
		if (navigator && navigator.notification) {
			title = (title ? title : "");
			if (confirm) {
				navigator.notification.confirm(message, callback, title, i18n.app.BTN_CANCEL + ',' + i18n.app.BTN_OK);
			} else {
				navigator.notification.alert(message, null, title, i18n.app.BTN_OK);
			}
		} else {
			alert(message);
		}
	}
}
