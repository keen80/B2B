Ext.define("B2B.view._App_Container", {
	extend: 'Ext.tab.Panel',
	xtype: 'appcontainer',
	requires: [
		'Ext.ux.toolbarspinner.TSpinner',
		'Ext.device.Camera'
	],
	config: {
		activeTab: 0,
		layout: {
			animation: {
				type: null
			},
		},
		tabBar: {
			layout: {
				pack: 'center',
				align: 'stretch'
			},
			docked: 'bottom',
			scrollable: false
		},
		items: [
			{
				xtype: 'activity',
				id: 'activity'
			},
			{
				xtype: 'beer',
				id: 'beers'
			},
			{
				xtype: 'friend',
				id: 'friend'
			},
			{
				xtype: 'userprofile',
				id: 'userprofile'
			}
		]
	},
	initialize: function(){

		this.callParent(arguments);

		var notificationButton = {
			iconCls: 'chat4',
			ui: 'plain',
			id: 'notificationbutton',
			handler: this.onGotoNotificationButtonTap,
			scope: this,
			align: 'left'
		};

		var toolbarSpinner =  {
			xtype : 'tbarspinner',
			id: 'tbarspinner',
			align : 'right',
			hidden: true
		};

		var gotoCheckInButton = {
			iconCls: 'position',
			ui: 'action',
			id: 'jump_2_checkin_btn',
			handler: this.onGotoCheckInButtonTap,
			scope: this,
			align: 'right'
		};

		var titleBar = {
			xtype: 'titlebar',
			docked: 'top',
			id: 'MainTitlebar',
			cls: 'slidableToolbar',
			defaults: {
				iconMask: true
			},
			ui: 'beermain',
			items: [
				notificationButton,
				toolbarSpinner,
				gotoCheckInButton
			]
		};

		var notificationBar = {
			xtype: 'notificationbar',
			id: 'notificationBar',
			hidden: true
		}
		this.add([ titleBar, notificationBar ]);
	},
	onGotoCheckInButtonTap: function(){
		this.fireEvent("gotoCheckInCommand", this);
	},
	onGotoNotificationButtonTap: function(){
		this.fireEvent("notificationShowCommand", this);
	}

});
