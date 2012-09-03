Ext.define('B2B.view.Beer_AroundMe', {
	extend: 'Ext.Panel',
	xtype: 'beeraroundmepanel',
	config: {
		title: 'BeerAroundMe',
		iconCls: 'locate2',
		html: [
			'<h1>BeerAroundMe</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	}
});