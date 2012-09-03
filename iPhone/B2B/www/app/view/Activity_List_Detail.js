Ext.define('B2B.view.Activity_List_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'activitylistdetail',
	config: {
		title: i18n.app.PANEL_ACTIVITYDETAIL,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);

    	var detailbackbutton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'activitylistdetailbackbutton',

			handler: this.onDetailbackbuttonTap,

			scope: this
		},
		detailtoolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				detailbackbutton
			]
		};
		this.add([detailtoolbar]);
    },
	onDetailbackbuttonTap: function(){
		this.fireEvent("backActivityDetailCommand", this);
	}
});