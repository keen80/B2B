Ext.define("B2B.controller.Notifications", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			notificationContainer: "notificationlistcontainerpanel",
			notificationList: "notificationlistcomponent",
			appContainer: "App_Container",
			app: "_app"
		},
		control: {
			appContainer: {
				notificationShowCommand: "onNotificationShow"
			},
			notificationContainer:{
				notificationReadAllCommand: "onNotificationReadAll",
				notificationBackCommand: "onNotificationBack"
			},
			notificationList: {
				itemtap: "onNotificationRead"
			}
		}
	},
	onNotificationShow: function(){
		this.getApp().push({
			xtype: "notificationlistcontainerpanel"
		});
	},
	onNotificationRead: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		Ext.Msg.alert("Notification Read");
	},
	onNotificationReadAll: function(){
		Ext.Msg.alert("Notification Read All");
	},
	onNotificationBack: function(){
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore("ActivityStreams").load();
	},
	init: function(){
		this.callParent(arguments);
	}
});