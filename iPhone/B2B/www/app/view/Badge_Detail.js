Ext.define('B2B.view.Badge_Detail', {
	extend: 'Ext.form.Panel',
	id: 'badgedetailpanel',
	xtype: 'badgedetailpanel',
	config: {
		title: i18n.app.PANEL_BADGEDETAIL,
		items: [
		],
		html: [
			'<h1>Badge Detail</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	},
	initialize: function(){
		this.callParent(arguments);

		var backButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'BackBadgeDetailBtn',
			handler: this.onBackButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_BADGEDETAIL,
			id: 'BadgeDetailTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		};

		this.add([toolbar]);
	},
	onBackButtonTap: function() {
		this.fireEvent("backBadgesCommand", this);
	}
});