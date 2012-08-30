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

        var header = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        },
        activityStreams = {
            xtype: "activitylistcomponent",
            store: Ext.getStore("Activities_Local"),
        },
        myLastDrinkIn = {
        	xtype: "activityusercomponent",
            store: Ext.getStore("Activities_User_Ajax"),
            draggable: false,
            height: 100
        };

         var myLastDrinkInPanel = {
        	xtype: "panel",
            id: "lastdrink",
            draggable: false,
            height: 70,
            docked: 'top',
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
                header,
	        	myLastDrinkInPanel,
	        	activityStreams
        	]
        }
		this.add([ /*container*/ header, myLastDrinkInPanel, activityStreams ]);
    }
});