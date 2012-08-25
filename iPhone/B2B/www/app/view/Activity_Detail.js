Ext.define('B2B.view.Activity_Detail', {
	extend: 'Ext.form.Panel',
	id: 'ActivityDetail',
	xtype: 'activitydetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_ACTIVITYDETAIL,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backActivityDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'activitydetail_back_btn',
			handler: this.onActivityDetailBackButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backActivityDetailButton
			]
		};
		this.add([toolbar]);
    },
	onActivityDetailBackButtonTap: function(){
		this.fireEvent("backActivityDetailCommand", this);
	}
});