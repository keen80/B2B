Ext.define('B2B.view.Notification', {
	extend: 'Ext.Panel',
	xtype: 'notification',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'user_list',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);

    	var markNotificationAllReadButton = {
			xtype: "button",
			text: i18n.app.BTN_MARKALLREAD,
			ui: 'action',
			id: 'mark_notification_allread_btn',
			handler: this.onMarkNotificationAllReadButtonTap,
			scope: this
		};

      var backNotificationButton = {
          text: i18n.app.BTN_BACK,
          ui: 'back',
          id: 'back_notification_btn',
          handler: this.onBackNotificationButtonTap,
          scope: this
      	};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_NOTIFICATION,
			docked: 'top',
			items: [
				backNotificationButton,
				{
					xtype: 'spacer'
				},
				markNotificationAllReadButton
			]
		};

		var notificationList = {
		    xtype: "notificationlistcomponent",
		    store: Ext.getStore("Notifications_Local"),
		};

		this.add([toolbar, notificationList]);

    },
	onMarkNotificationAllReadButtonTap: function(){
		this.fireEvent("notificationReadAllCommand", this);
	},
	onBackNotificationButtonTap: function(){
		this.fireEvent("notificationBackCommand", this);
	}

});