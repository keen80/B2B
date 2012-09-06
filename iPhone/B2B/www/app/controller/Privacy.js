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
		var confirmation = window.confirm(utils.__(i18n.app.DIALOG_YOUSUREREMOVEDATA));
		if(confirmation){
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
			window.location.reload();
		};
	},
	onLogOutCommand: function(){
		var LogOut = function(){
			Ext.Msg.alert("LogOut Mock");
		};
		Ext.Msg.confirm(i18n.app.PANEL_LOGOUT, utils.__(i18n.app.DIALOG_YOUSURELOGUT), LogOut);
		Ext.getStore("Profile_Ajax").removeAll();
		Ext.getStore("Profile_Local").removeAll();
		window.location.reload();
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



