Ext.define('B2B.view.Beer_List_SearchComponent', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'beerlistsearchcomponent',
	id: 'beerlistsearchcomponent',
	config: {
		docked: 'top',
		items: [
			{
				
			}
		]
	},
	initialize: function(){
		this.callParent(arguments);

		var searchField = {
			xtype: 'searchfield',
			placeHolder: i18n.app.LABEL_SEARCH,
			name: 'beerfiltersearch',
			flex: 1
		};

		var addBeerButton ={
			xtype: 'button',
				text: i18n.app.BTN_ADDBEER,
				ui: 'action',
				id: 'add_beer_btn',
				handler: this.onAddBeerButtonTap,
				scope: this
		}

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			id: 'searchbeercomponenttoolbar',
			ui: 'neutral',
			docked: 'top',
			items: [
				searchField,
				addBeerButton
			]
		};
		this.add([toolbar]);
	},
	onAddBeerButtonTap: function(){
		this.fireEvent("beerAddCommand", this);
	}
});