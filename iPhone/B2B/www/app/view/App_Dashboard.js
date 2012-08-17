Ext.define('B2B.view.App_Dashboard', {
	extend: 'Ext.Panel',
	requires: [
        'Ext.TitleBar',
    ],
	xtype: 'dashboardpanel',
	
	config: {
		title: i18n.app.PANEL_DASHBOARD,
		iconCls: 'maps',
		styleHtmlContent: true,

		items:[
		
        ]
	},
	initialize: function(){

    	this.callParent(arguments);

		var activityStreams = {
            xtype: "activitystreamcomponent",
            store: Ext.getStore("Friends"),
            listeners: {
              //  disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        };

		this.add([ activityStreams ]);
    }
});