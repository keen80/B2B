Ext.define('B2B.view.OtherProfile', {
	extend: 'Ext.Panel',
	xtype: 'otherprofilepanel',
	config: {
		title: 'OtherProfile',
		iconCls: 'user3',
		html: [
			'<h1>Other Profile</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	}
});