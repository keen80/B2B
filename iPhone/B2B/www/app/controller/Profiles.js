Ext.define("B2B.controller.Profiles", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofileaboutpanel",
			profileForm: "userprofileform",
			app: "_app"
		},
		control: {
			profile: {
				editProfileCommand: "onShowProfileForm",
				reloadProfileCommand: "onReloadProfile",
				settingsProfileCommand: "onShowSettings"
			},
			profileForm: {
				saveProfileCommand: "onSaveProfile",
				backProfileCommand: "onBackProfile"
			}
		}
	},
	onShowProfileForm: function(){
		this.getApp().push({
			xtype: "userprofileform"
		});

		var profileForm = this.getProfileForm();
		profileForm.reset();
		profileForm.setRecord(Ext.getStore('Profile_Local').first());
		/*var activatedOnField = Ext.getCmp('activatedOnField');
		var lastLoginOnField = Ext.getCmp('lastLoginOnField');
		activatedOnField.setValue(moment(activatedOnField.getValue()).format('dddd, do MMMM YYYY'));
		lastLoginOnField.setValue(moment(lastLoginOnField.getValue()).format('dddd, do MMMM YYYY'));*/
	},

	onSaveProfile: function() {
		Ext.Msg.alert("Saved!");
		this.getApp().pop();
	},
	onBackProfile: function() {
		this.getApp().pop();
	},
	onShowSettings: function(a){
		var a = Ext.getCmp("userprofileaboutpanel");
		if (!a.actions){
			a.actions = Ext.Viewport.add({
				xtype: 'actionsheet',
				items: [
					{
						text: i18n.app.PANEL_PREFERENCES,
						scope: this,
						ui: 'decline',
						handler: function(){
							a.actions.hide();
							this.getApp().push({
								xtype: "userpreferencesform"
							});
						}
					},
					{
						text: i18n.app.PANEL_PRIVACY,
						scope: this,
						handler: function(){
							a.actions.hide();
							this.getApp().push({
								xtype: "userprofileprivacyform"
							});

						}
					},
					{
						text: i18n.app.BTN_CANCEL,
						scope: this,
						handler: function(){
							a.actions.hide();
						}
					}
				]	
			});
		}
		a.actions.show();
	},
	launch: function(){
		this.callParent(arguments);
		/*var storeProfile = Ext.getStore("Profile_Ajax");
		storeProfile.remove(storeProfile.getRange());
		storeProfile.load();*/
	},
	init: function(){
		this.callParent(arguments);
	}
});

/*
userpreferencesform
userprofileprivacyform
*/