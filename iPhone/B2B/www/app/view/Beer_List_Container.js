Ext.define('B2B.view.Beer_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'beerlistcontainerpanel',
	id: "beerlistcontainer",
	requires: [
		'Ext.SegmentedButton'
	],
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'trash',
		layout: {
        	type: 'fit'
        }
	},
	initialize: function(){
		this.callParent(arguments);

		var me = this;

/*
        var header = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        };
*/
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
		    id: "beerlist",
		   	store: null,
		   // grouped: true,
		   // indexBar: true,
		    singleSelect: true
		};

		this.add([ /*header, */beerlistsearchcomponent,/* beerToolbar, */beerList]);
	}
});