// Bridge between native functions and js

function facebookLogInStatus(isLoggedIn) {
	if (isLoggedIn) {
		bridge.getFBUserInformations();
	} else {
		if (Ext.fly('appLoadingIndicator')) {
			Ext.fly('appLoadingIndicator').destroy();
		}
		Ext.Viewport.removeAll(true, true);
		Ext.Viewport.add(Ext.create('B2B.view._Login'));
	}
};

function loginOnFBCompleted(success, email, displayName, gender, nationality, birthDay) {
	if (success) {
		authentication.loginOnFBCompleted(email, displayName, gender, nationality, birthDay);
	} else {
		utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
	}
};

function logoutCompleted() {
	window.location.reload();
};

/**********************************************************************************************/

var bridge = {
	getFBUserLogInStatus: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserLogInStatus";
			this.sendSelector(selector);
		} else {
			facebookLogInStatus(true);
		}
	},
	getFBUserInformations: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserInformations";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
		}
	},
	doLoginOnFB: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:doLoginOnFB";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
		}
	},
	logout: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:logout";
			this.sendSelector(selector);
		} else {
			logoutCompleted();
		}
	},
	sendSelector: function(selector) {
		if (Ext.feature.has.Touch && !_.isEmpty(selector)) {
			document.location = "selector://" + selector;
		}
	}
};