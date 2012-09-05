Ext.define("B2B.controller.Notifications", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			notificationContainer: "notification",
			notificationList: "notificationlistcomponent",
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
		this.getApp().push({
			xtype: "notification",
			id: 'notification'
		});
	},
	onNotificationRead: function(a, b, c, record){
		/* deselection of the list */
		setTimeout(function(){a.deselect(b);},500);
		var user = Ext.getStore("Profile_Local").first().data;
		//record.data.idNotification
		 Ext.Ajax.request({
                        url: "http://192.168.1.7:8080/birrettaservice/rest/bserv/setNotificationRead",
                        method: "GET",
                        headers: {
                        "btUsername": user.idUser,
                        "btSid" : "puppa"
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
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});