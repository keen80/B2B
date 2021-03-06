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

function loginOnFBCompleted(success, idFB, email, displayName, gender, nationality, birthDate) {
	bridge.pendingRequest = false;

	if (success) {
		authentication.loginOnFBCompleted(idFB, email, displayName, gender, nationality, birthDate);
	} else {
		utils.alert(i18n.app.ALERT_ERRORCOMMUNICATION, i18n.app.COMMON_ATTENTION);
		Ext.Viewport.setMasked(false);
	}
};

// Se null allora è stato generato un errore
function facebookFriendsCompleted(arrayFriends) {

};

function logoutCompleted() {
	window.location.reload();
};

function viewDidAppear() {

};

function applicationBecomeActive(fbUserIsLoggedIn) {
	if (!fbUserIsLoggedIn && bridge.pendingRequest) {
		bridge.pendingRequest = false;
		Ext.Viewport.setMasked(false);
	}
};

/**********************************************************************************************/

var bridge = {
	pendingRequest: false,
	getFBUserLogInStatus: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserLogInStatus";
			this.sendSelector(selector);
		} else {
			facebookLogInStatus(true);
		}
	},
	getFBUserInformations: function() {
		this.pendingRequest = true;

		Ext.Viewport.setMasked({
            xtype: 'loadmask',
            loadingText: i18n.app.HINT_LOADING
        });
        Ext.Viewport.setMasked(true);

		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:getFBUserInformations";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "02130123102", "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
		}
	},
	doLoginOnFB: function() {
		this.pendingRequest = true;

		Ext.Viewport.setMasked({
            xtype: 'loadmask',
            loadingText: i18n.app.HINT_LOADING
        });
        Ext.Viewport.setMasked(true);

		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:doLoginOnFB";
			this.sendSelector(selector);
		} else {
			loginOnFBCompleted(true, "02130123102", "pippo@gmail.com", "Pippo", "male", "it_IT", "10/09/1983");
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
	getFacebookFriends: function() {
		if (Ext.feature.has.Touch) {
			var selector = "targets=socialManager:requestFacebookFriends";
			this.sendSelector(selector);
		} else {
			facebookFriendsCompleted([{id: "234213423423", name:"Pluto", haveApp:true},{id: "276813423423", name:"Paperino", haveApp:true},{id: "2399913423423", name:"Topolino", haveApp:false}]);
		}
	},
	sendSelector: function(selector) {
		if (Ext.feature.has.Touch && !_.isEmpty(selector)) {
			document.location = "selector://" + selector;
		}
	}
};