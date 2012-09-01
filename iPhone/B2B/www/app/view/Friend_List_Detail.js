Ext.define('B2B.view.Friend_List_Detail', {
	extend: 'Ext.form.Panel',
	xtype: 'friendlistdetail',
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
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backFriendDetailButton
			]
		},
		deleteProfileButton = {
			text: i18n.app.BTN_REMOVE,
			ui: 'action',
			id: 'delete_profile_btn',
			handler: this.onDeleteProfileButtonTap,
			scope: this
		},
		html = this.getStringHTMLFromValues(this.jsonData.data);

		this.add([toolbar, deleteProfileButton]);
		this.setHtml([html]);
	},
	getStringHTMLFromValues: function(info){
		var value = '';

		if (_.isEmpty(info.image)) {
			value += '<img class="avatar_small" src="' + HH.default_user64 +'" width="200" height="200" />';
		}
		value += '<div class="profile-detail">';
		value += '<p>' + i18n.app.HTML_NAME + ': <b>' + info.firstName + '</b></p>';
		value += '<p>' + i18n.app.HTML_SURNAME + ': <b>' + info.lastName + '</b></p>';
		value += '<p>' + i18n.app.HTML_ALIAS + ': <b>' + info.displayName + '</b></p>';
		value += '<hr />';
		value += '<p>' + i18n.app.HTML_EMAIL + ': <b>' + info.email + '</b></p>';
		value += '<hr />';
		value += '<p>' + i18n.app.HTML_NFRIENDS + ': <b>' + info.counter_friends + '</b></p>';
		value += '<p>' + i18n.app.HTML_CHECKINS + ': <b>' + info.counter_checkIns + '</b></p>';
		value += '<p>' + i18n.app.HTML_BADGES + ': <b>' + info.counter_badges + '</b></p>';
		value += '</div>';
		return value;
	},
	onFriendDetailBackButtonTap: function(){
		this.fireEvent("backFriendDetailCommand", this);
	},
	onFriendRemoveBackButtonTap: function(){
		this.fireEvent("removeFriendDetailCommand", this);
	}
});