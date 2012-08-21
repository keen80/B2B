Ext.define('B2B.view.Friend_Finder', {
	extend: 'Ext.form.Panel',
	id: 'FriendFinder',
	xtype: 'friendfinderpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_FRIENDFINDER,
		iconCls: 'add',
		items: [
		]
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backFriendFinderButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'friendfinder_back_btn',
			handler: this.onFriendFinderBackButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backFriendFinderButton,
			]
		};
		this.add([toolbar]);

    },
	onFriendFinderBackButtonTap: function(){
		this.fireEvent("backFriendFinderCommand", this);
	}
});