Ext.define("B2B.controller.Profiles", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			profileForm: "userform",
			app: "_app"
		},
		control: {
			profile: {
				editProfileCommand: "onShowProfileForm",
				friendsProfileCommand: "onShowFriends",
				settingsCommand: "onShowSettings"
			},
			profileForm: {
				saveProfileCommand: "onSaveProfile",
				backProfileCommand: "onBackProfile"
			}
		}
	},
	onShowProfileForm: function(){
		var userform = {
			xtype: 'userform',
			id: "userform"
		};

		var profileContainer = this.getProfile();
		this.getApp().add(userform);
		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
	},
	onSaveProfile: function(source, values) {
		var errorCode = -1, errorMsg = "",
			that = this,
			viewport = Ext.Viewport;

		viewport.setMasked({
            xtype: 'loadmask',
            loadingText: i18n.app.HINT_LOADING
        });

		viewport.setMasked(true);

		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/saveUser",
			method: "POST",
			headers: {
        		"btUsername": values.username
    		},
			params: {
				idUser: values.idUser,
				idFacebook: values.idFacebook,
				username: values.username,
				email: values.email,
				displayName: values.displayName,
				firstName: values.firstName,
				lastName: values.lastName,
				description: values.description,
				birthDate: values.birthDate,
				gender: values.gender,
				nationality: values.nationality
			},
			success: function(result) {
				var json = Ext.decode(result.responseText, true);
				if (json) {
					errorCode = json.response.status.code;
					errorMsg = json.response.status.msg;

					if (errorCode < 200 && json.response.body.list.length > 0) {
						that._doSaveProfileCallback(0, errorMsg, errorCode);
					} else {
						that._doSaveProfileCallback(1, errorMsg, errorCode);
					}
				} else {
					that._doSaveProfileCallback(1, errorMsg, errorCode);
				}
			},
			failure: function(result) {
				that._doSaveProfileCallback(1, errorMsg, errorCode);
			}
		});
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userform'));
	},
	_doSaveProfileCallback: function(index, errorMsg, errorCode) {
		var viewport = Ext.Viewport;

		switch(index) {
			case 0:    // Success
				HH.log("---> Step: [Save user] Success");
				var appcontainer = this.getApp();
				appcontainer.remove(Ext.getCmp('userform'));
				break;
			default:    // Fail
				HH.log("--> Step: [Save user] Failure - CODE: " + errorCode + " - MSG: " + errorMsg);
				utils.alert(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
				break;
		}

		viewport.setMasked(false);
	},
	onBackProfile: function() {
		var appcontainer = this.getApp();
		appcontainer.remove(Ext.getCmp('userform'));
	},
	onShowFriends: function() {
		var tabPanel = Ext.Viewport.down("appcontainer");
		tabPanel.setActiveItem(Ext.getCmp('friend'));
	},
	onShowSettings: function() {
		var settings = {
			xtype: 'settings',
			id: 'settings'
		};

		var appcontainer = this.getApp();
		appcontainer.add(settings);
		appcontainer.setActiveItem(2);
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});