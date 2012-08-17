Ext.define('B2B.view.DrinkAddForm', {
	extend: 'Ext.Panel',
	xtype: 'drinkaddformpanel',
	config: {
		title: 'DrinkAddForm',
		iconCls: 'add',
		html: [
			'<h1>DrinkAddForm</h1>',
			'I changed the default <b>HTML Contents</b> to something different!'
		].join("")
	}
});