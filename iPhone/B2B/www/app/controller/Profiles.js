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
				reloadProfileCommand: "onReloadProfile",
				settingsProfileCommand: "onShowSettings",
				privacyProfileCommand: "onShowPrivacy"
			},
			profileForm: {
				saveProfileCommand: "onSaveProfile",
				backProfileCommand: "onBackProfile"
			}
		}
	},
	onShowProfileForm: function(){
		/*
		this.getApp().push({
			xtype: "userform",
			id: "userform"
		});

		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
*/
		var userform = {
			xtype: 'userform',
			id: 'userform'
		};

		var profileContainer = this.getProfile();
		profileContainer.add(userform);
		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
		profileContainer.setActiveItem(2);
		
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
		//this.getApp().pop();
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userform'));
	},
	onShowPrivacy: function() {
		var userProfilePrivacy = {
			xtype: 'userprofileprivacyform',
			id: 'userprofileprivacyform'
		};

		var profileContainer = this.getProfile();
		profileContainer.add(userProfilePrivacy);
		profileContainer.setActiveItem(2);
	},
	onShowSettings: function(a){

		var userpreferencesform = {
			xtype: 'userpreferencesform',
			id: 'userpreferencesform'
		};

		var profileContainer = this.getProfile();
		profileContainer.add(userpreferencesform);
		profileContainer.setActiveItem(2);
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});