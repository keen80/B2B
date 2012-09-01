Ext.define('B2B.view.Beer', {
	extend: 'Ext.Panel',
	xtype: 'beer',
	/*
	requires: [
		'Ext.SegmentedButton'
	], */
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'drink_beerpint',
		scrollable: false,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
		this.callParent(arguments);

		var beersearch = {
			xtype: 'beersearch',
			id: 'beersearch'
		};
		/*
		var groupedButton = {
			xtype: 'segmentedbutton',
			items: [
				{
					text: i18n.app.BTN_ORDERBYALPHA,
					pressed: true
				},
				{
					text: i18n.app.BTN_ORDERBYSTYLE,
					pressed: false
				},
				{
					text: i18n.app.BTN_ORDERBYNATION,
					pressed: false
				}
			]
		};

		var beerToolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			ui: 'neutral',
			docked: 'top',
			items: [
				{
					xtype: 'spacer'
				},
				groupedButton,
				{
					xtype: 'spacer'
				},
			]
		};
		*/
		var beerlist = {
		    xtype: "beerlist",
		    id: "beerlist",
		   	store: null,
		    singleSelect: true
		};

		this.add([ beersearch, beerlist]);
	}
});