Ext.define("B2B.controller.Settings", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			settings: "settings",
			app: "_app"
		},
		control: {
			settings: {
				removeDataCommand: "onRemoveDataCommand",
				settingsBackCommand: 'onBackSettings',
				logoutCommand: "onLogOutCommand"
			}
		}
	},
	onRemoveDataCommand: function(){
		var removeCallback = function(button){
			if (button === 2) {
				Ext.getStore("Activities_Ajax").removeAll();
				Ext.getStore("Activities_Local").removeAll();
				Ext.getStore("Beers_Ajax").removeAll();
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
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSUREREMOVEDATA), i18n.app.PANEL_LOGOUT, true, removeCallback);
	},
	onLogOutCommand: function(){
		var logoutCallback = function(button){
			if (button === 2) {
				Ext.getStore("Profile_Ajax").removeAll();
				Ext.getStore("Profile_Local").removeAll();
				bridge.logout();
			}
		};

		utils.alert(utils.__(i18n.app.DIALOG_YOUSURELOGOUT), i18n.app.PANEL_LOGOUT, true, logoutCallback);
	},
	onBackSettings: function(){
		var appcontainer = Ext.getCmp('_app');
		console.log("TODO Save preferences");
		appcontainer.remove(Ext.getCmp('settings'));
	},
	init: function(){
		this.callParent(arguments);
	}
});



