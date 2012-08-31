Ext.define('B2B.view.Activity_List_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'activitylistdetail',
	config: {
		title: i18n.app.PANEL_ACTIVITYDETAIL,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);

    	var activitylistdetailbackbutton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'activitylistdetailbackbutton',
			handler: this.onActivitylistdetailbackbuttonTap,
			scope: this
		},
		activitylistdetailtoolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				activitylistdetailbackbutton
			]
		};
		this.add([activitylistdetailtoolbar]);
    },
	onActivitylistdetailbackbuttonTap: function(){
		this.fireEvent("backActivityDetailCommand", this);
	}
});