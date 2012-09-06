Ext.define("B2B.controller.Privacy", {
	extend: "Ext.app.Controller",
	id: "Privacy",
	config: {
		refs: {
			userPrivacyForm: "userprofileprivacyform",
			app: "_app"
		},
		control: {
			userPrivacyForm: {
				privacyRemoveDataCommand: "onRemoveDataCommand",
				privacyLogoutCommand: "onLogOutCommand",
				privacyBackCommand: 'onBackPrivacy'
			}
		}
	},
	onRemoveDataCommand: function(){
		var removeCallback = function(button){
			if (button == 1) {
				Ext.getStore("Activities_Ajax").removeAll();
				Ext.getStore("Activities_Local").removeAll();
				Ext.getStore("Beers_Ajax").removeAll();
				//Ext.getStore("Beers_Single_Ajax").removeAll();
				Ext.getStore("Friends_Ajax").removeAll();
				Ext.getStore("Friends_Local").removeAll();
				Ext.getStore("Notifications_Ajax").removeAll();
				Ext.getStore("Notifications_Local").removeAll();
				Ext.getStore("Places_Ajax").removeAll();
				Ext.getStore("Drinks_Ajax").removeAll();
				Ext.getStore("Drinks_Local").removeAll();
				Ext.getStore("Profile_Ajax").removeAll();
				Ext.getStore("Profile_Local").removeAll();
				bridge.logout();
				window.location.reload();
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSUREREMOVEDATA), i18n.app.PANEL_LOGOUT, true, removeCallback);
	},
	onLogOutCommand: function(){
		var logoutCallback = function(button){
			if (button == 1) {
				Ext.getStore("Profile_Ajax").removeAll();
				Ext.getStore("Profile_Local").removeAll();

				bridge.logout();

				window.location.reload();
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSURELOGOUT), i18n.app.PANEL_LOGOUT, true, logoutCallback);
	},
	onBackPrivacy: function(){
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userprofileprivacyform'));
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});



