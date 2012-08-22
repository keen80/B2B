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
		/* deselection of the list */
		setTimeout(function(){a.deselect(b);},500);
		/*
			TODO
			Mark the clicke notification as read and synch the store and the server

		*/
		Ext.Msg.alert("TODO: Notification Read");
	},
	onNotificationReadAll: function(){
		/* TODO SET all notification read */
		Ext.Msg.alert("TOD: Notification Read All");
	},
	onNotificationBack: function(){
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});