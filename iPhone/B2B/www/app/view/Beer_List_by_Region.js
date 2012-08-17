Ext.define('B2B.view.BeerDetail', {
	extend: 'Ext.Panel',
	xtype: 'beerdetailpanel',
	config: {
		title: 'BeerDetail',
		iconCls: 'bullseye1',
		html: [
			'<h1>BeerDetail</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	}
});