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

        var myLastDrinkIn = {
        	xtype: "activityusercomponent",
            store: Ext.getStore("Activities_User_Ajax"),
            draggable: false,
            height: 100
        };

         var myLastDrinkInPanel = {
        	xtype: "panel",
            id: "lastdrink",
            draggable: false,
            height: 80,
            html: '<div class="loading_div"></div>'
        };

        var container = {
        	xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
        	items: [
	        	myLastDrinkInPanel,
	        	activityStreams
        	]
        }
		this.add([ container ]);
    }
});