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
				editProfileCommand: "onShowProfileForm"
			},
			profileForm:{
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
		var activatedOnField = Ext.getCmp('activatedOnField');
		var lastLoginOnField = Ext.getCmp('lastLoginOnField');
		activatedOnField.setValue(moment(activatedOnField.getValue()).format('dddd, do MMMM YYYY'));
		lastLoginOnField.setValue(moment(lastLoginOnField.getValue()).format('dddd, do MMMM YYYY'));
	},
	onSaveProfile: function(){
		Ext.Msg.alert("Saved!");
		this.getApp().pop();
	},
	onBackProfile: function(){
		this.getApp().pop();
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