Ext.define('B2B.view.Activity_List_Container', {
	extend: 'Ext.Panel',
	requires: [
        'Ext.TitleBar',
    ],
	xtype: 'activitylistcontainerpanel',
	
	config: {
		title: i18n.app.PANEL_DASHBOARD,
		iconCls: 'maps',
		styleHtmlContent: true
	},
	initialize: function(){

    	this.callParent(arguments);

		var activityStreams = {
            xtype: "activitylistcomponent",
            store: Ext.getStore("ActivityStreams"),
        };

		this.add([ activityStreams ]);
    }
});