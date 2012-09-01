Ext.define("B2B.controller.Drinks", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			checkInPanel: "drinkaroundmepanel",
			appContainer: "appcontainer",
			app: "_app"
		},
		control: {
			checkInPanel: {
				checkInDetailCommand: "onCheckInDetail",
				refreshAroundCommand: "onCheckInRefreshAround",
				backCheckCommand: "onCheckBack"
			},
			appContainer:{
				gotoCheckInCommand: "onGotoCheckIn",
			}
		}
	},
	onGotoCheckIn: function(){
		this.getApp().push({
			xtype: "drinkaroundmepanel"
		});
	},
	onCheckIn: function(){
		Ext.Msg.alert("Check In!");
		this.getApp().pop();
	},
	onCheckBack: function(){
		this.getApp().pop();
	},
	onCheckInRefreshAround: function(){
		Ext.Msg.alert("To Be Implemented");
	},
	onShow: function(){
		console.log("TODO: Refresh on Show");

		/* function(list, opts){
        this.getStore().load();*/
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});