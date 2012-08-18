Ext.define('B2B.view.Activity_List_Container', {
	extend: 'Ext.Panel',
	requires: [
        'Ext.TitleBar',
    ],
	xtype: 'activitylistcontainerpanel',
	
	config: {
		title: i18n.app.PANEL_ACTIVITY,
		iconCls: 'maps',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);

		var activityStreams = {
            xtype: "activitylistcomponent",
            store: Ext.getStore("Activities_Local"),
        };

		this.add([ activityStreams ]);
    }
});