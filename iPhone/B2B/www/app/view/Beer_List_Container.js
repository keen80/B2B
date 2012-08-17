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

		var beerlistsearchcomponent = {
			xtype: 'beerlistsearchcomponent',
		};

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

		var beerList = {
		    xtype: "beerlistcomponent",
		    store: Ext.getStore("Beers_Ajax"),
		    grouped: true,
		    indexBar: true,
		    ui: 'round',
		    singleSelect: true,
		    listeners: {
		      //  disclose: { fn: this.onNotesListDisclose, scope: this }
		    }
		};

		this.add([ beerlistsearchcomponent,/* beerToolbar, */beerList]);
	},
	onAddFriendButtonTap: function(){
		this.fireEvent("addFriendCommand", this);
	}
});