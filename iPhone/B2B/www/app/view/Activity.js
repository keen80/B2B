Ext.define('B2B.view.Activity', {
	extend: 'Ext.Panel',
	xtype: 'activity',
	config: {
		title: i18n.app.PANEL_ACTIVITY,
		iconCls: 'smiley_friends',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

    	this.callParent(arguments);

        var activityheader = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        },
        mylatestdrink = {
            xtype: "panel",
            id: "mylatestdrink",
            draggable: false,
            height: 80,
            docked: 'top',
            html: '<div class="loading_div"></div>'
        };
        activitylist = {
            xtype: "activitylist",
            id: 'activitylist',
            store: Ext.getStore("Activities_Local"),
        }

		this.add([ /*activityheader,*/ mylatestdrink, activitylist ]);
    }
});