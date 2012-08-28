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
		title = this.jsonData.title,
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: (_.isEmpty(title) ? i18n.app.PANEL_BADGEDETAIL : title),
			id: 'BadgeDetailTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		html = this.getStringHTMLFromValues(this.jsonData);

		this.add([toolbar]);
		this.setHtml(html);
	},
	getStringHTMLFromValues: function(badge){
		var value = '';

		value += '<div class="badge-detail">';
		value += '<img class="badge-image-big" src="';
		if (_.isEmpty(badge.imageUlr)) {
			value += HH.default_badge64;
		} else {
			value += badge.imageUrl;
		}
		value += '" width="200" height="200" />';
		value += '<hr />';
		value += '<p class="badge-title"><b>' + badge.title + '</b></p>';
		value += '<p class="badge-description">' + badge.description + '</p>';
		value += '</div>';
		return value;
	},
	onBackButtonTap: function() {
		this.fireEvent("backBadgesCommand", this);
	}
});