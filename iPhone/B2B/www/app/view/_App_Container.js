Ext.define("B2B.view._App_Container", {
	extend: 'Ext.tab.Panel',
	xtype: 'App_Container',
	requires: [
		'Ext.ux.slidenavigation.SlideNavigation',
		'Ext.ux.toolbarspinner.TSpinner',
		'Ext.device.Camera'
	],
	config: {
		activeTab: 0,
		layout: {
			animation: {
				type: 'fade'
			}
		},
		tabBar: {
			layout: {
				pack: 'center',
				align: 'center'
			},
			docked: 'bottom',
			scrollable: false
		},
		items: [
			{
				xtype: 'activitylistcontainerpanel'
			},
			{
				xtype: 'beerlistcontainerpanel'
			},
			{
				xtype: 'friendlistcontainerpanel'
			},
			{
				xtype: 'userprofilecontainerpanel'
			},
			{
				xtype: 'cameracontainerpanel'
			}
		]
	},
	initialize: function(){

		this.callParent(arguments);

		var logo = {
			xtype: 'image',
			src: 'resources/img/logo_text_black_small.png',
    		height: 28,
    		width: 144,
			align: 'left'
		}

		var gotoNotificationButton = {
			iconCls: 'compose',
			ui: 'plain',
			id: 'jump_2_notification_btn',
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
			iconCls: 'locate',
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
			items: [
				logo,
				gotoNotificationButton,
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
