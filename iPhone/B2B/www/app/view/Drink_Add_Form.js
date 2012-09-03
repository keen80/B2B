Ext.define('B2B.view.Drink_Add_Form', {
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

/*
			{
				xtype: 'starrating',
			    itemsCount : 5,
			    name: "param1",
			    label : 'Rating',
			    inputCls : 'x-rating-star-input',
			    itemCls : 'x-rating-star',
			    itemHoverCls : 'x-rating-star-hover'
			},
*/