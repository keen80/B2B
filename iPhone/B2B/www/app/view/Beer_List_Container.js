Ext.define('B2B.view.Beer_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'beerlistcontainerpanel',
	requires: [
		'Ext.SegmentedButton'
	],
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'list',
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
		this.callParent(arguments);

		var me = this;

		var beerlistsearchcomponent = {
			xtype: 'beerlistsearchcomponent',
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
		var beerList = {
		    xtype: "beerlistcomponent",
		    store: Ext.getStore("Beers_Single_Ajax"),
		   // grouped: true,
		   // indexBar: true,
		   // ui: 'round',
		    singleSelect: true
		    /* FOTTUTO BASTARDO, catch nel controller perche' e' mascherato
		    onItemDisclosure: function(a, b, c, d, e) {
		   		me.onListItemTap(c);
		   	},
		   	onItemTap: function(a, b, c, d, e, f){
		   		me.onListItemTap(b);
		   	}
		   	listeners:[
{
				onItemTap: function(a, b, c, d, e, f){
		   			me.onListItemTap(d);
		   		}
}
		   	]*/
		};

		this.add([ beerlistsearchcomponent,/* beerToolbar, */beerList]);
	}/*,
	onListItemTap: function(record){
		this.fireEvent("viewBeerDetailCommand", this, record);
	}*/
});