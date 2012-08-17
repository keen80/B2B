Ext.define('B2B.view.FriendProfile', {
	extend: 'Ext.Panel',
	xtype: 'friendprofilepanel',
	config: {
		title: 'FriendProfile',
		iconCls: 'user',
		html: [
			'<h1>FriendProfile</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	}
});