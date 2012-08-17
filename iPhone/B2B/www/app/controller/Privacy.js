Ext.define("B2B.controller.Privacy", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			privacyContainer: "userprofileprivacyform",
			appContainer: "App_Container",
			app: "_app"
		},
		control: {
			privacyContainer: {
				privacyRemoveDataCommand: "onRemoveData",
				privacyLogoutCommand: "onLogOut"
			}
		}
	},
	onRemoveData: function(){
		var removeData = function(){
			Ext.Msg.alert("Data Removed Mock");
		};
		console.log("removeData Received");
		Ext.Msg.confirm("Test Remove Data", utils.__(i18n.app.DIALOG_YOUSURE), removeData);
	},
	onLogOut: function(){
		var LogOut = function(){
			Ext.Msg.alert("LogOut Mock");
		};
		console.log("LogOut Received");
		Ext.Msg.confirm("Test Log Out", utils.__(i18n.app.DIALOG_YOUSURE), LogOut);
	},
	init: function(){
		this.callParent(arguments);
	}
});



