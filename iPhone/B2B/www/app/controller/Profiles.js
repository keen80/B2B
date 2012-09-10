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
			id: 'userform'
		};

		var profileContainer = this.getProfile();
		this.getApp().add(userform);
		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
		// profileContainer.setActiveItem(2);

	},

	onSaveProfile: function(source, idUser, username, displayName, email, gender, nationality, birthDate) {
		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/saveUser",
			method: "POST",
			headers: {
        		"btUsername": username
    		},
			params: {
				idUser: idUser,
				username: username,
				displayName: displayName,
				email: email,
				gender: gender,
				nationality: nationality,
				birthDate: birthDate
			},
			callback: function(response) {
				console.log(response);
			}
		});
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userform'));
	},
	onBackProfile: function() {
		var appcontainer = Ext.getCmp('_app');
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