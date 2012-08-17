Ext.define('B2B.view.Component_NotificationBar', {
	extend: 'Ext.Container',
	xtype: 'notificationbar',
	config: {
		cls: 'notificationbar',
        docked: 'top',
        height: 30,
        html : ['test'
        ].join('')
	}
});