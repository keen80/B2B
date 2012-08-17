Ext.define('B2B.view.Friend_Detail', {
	extend: 'Ext.form.Panel',
	id: 'FriendDetail',
	xtype: 'frienddetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_FRIENDDETAIL,
		iconCls: 'add',
		items: [
		]
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backFriendDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'frienddetail_back_btn',
			handler: this.onFriendDetailBackButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backFriendDetailButton,
			]
		};
		this.add([toolbar]);

    },
	onFriendDetailBackButtonTap: function(){
		this.fireEvent("backFriendDetailCommand", this);
	}
});