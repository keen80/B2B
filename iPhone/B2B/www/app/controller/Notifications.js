Ext.define("B2B.controller.Notifications", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			notificationContainer: "notification",
			notificationList: "notificationlist",
			appContainer: "appcontainer",
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
		var notification = {
			xtype: "notification",
			id: 'notification'
		};
		var appcontainer = Ext.getCmp('_app'); //.getProfile();
		appcontainer.add(notification);
		appcontainer.setActiveItem(2);
	},
	onNotificationRead: function(a, b, c, record){
		/* deselection of the list */
		setTimeout(function(){a.deselect(b);},500);
		var user = Ext.getStore("Profile_Local").first().data;
		//record.data.idNotification
		Ext.Ajax.request({
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/setNotificationRead",
			method: "GET",
			headers: {
				"btUsername": user.idUser,
				"btSid" : user.token
			},
			params: {
					idUser: user.idUser,
					idNotification: record.data.idNotification
			},
			callback: function(response) {
					console.log(response);
			}
		});

		console.error("TODO: Notification Read");
	},
	onNotificationReadAll: function(){
		/* TODO SET all notification read */
		console.error("TODO: Notification Read All");
	},
	onNotificationBack: function(){
		var appcontainer = Ext.getCmp('_app');
		appcontainer.remove(Ext.getCmp('notification'));
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});