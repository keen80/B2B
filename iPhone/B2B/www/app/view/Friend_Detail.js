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
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backFriendDetailButton
			]
		};

		this.add([toolbar]);

		var html = this.getStringHTMLFromValues(this.jsonData.data);
		this.setHtml([html].join(""));
	},
	getStringHTMLFromValues: function(info){
		var value = '';

		if (info.avatar !== null && info.avatar !== '') {
		value += '<img id="friend_thumbnail" src="' + info.avatar +'" /><hr />';
		}

		value += '<p>' + i18n.app.HTML_NAME + ': <b>' + info.firstName + '</b></p>';
		value += '<p>' + i18n.app.HTML_SURNAME + ': <b>' + info.lastName + '</b></p>';
		value += '<p>' + i18n.app.HTML_ALIAS + ': <b>' + info.displayName + '</b></p>';
		value += '<hr />';
		value += '<p>' + i18n.app.HTML_EMAIL + ': <b>' + info.email + '</b></p>';
		value += '<hr />';
		value += '<p>' + i18n.app.HTML_NFRIENDS + ': <b>' + info.counter_friends + '</b></p>';
		value += '<p>' + i18n.app.HTML_CHECKINS + ': <b>' + info.counter_checkIns + '</b></p>';
		value += '<p>' + i18n.app.HTML_BADGES + ': <b>' + info.counter_badges + '</b></p>';

		return value;
	},
	onFriendDetailBackButtonTap: function(){
		this.fireEvent("backFriendDetailCommand", this);
	}
});