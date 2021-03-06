Ext.define('B2B.view.Beer_Component', {
	extend: 'Ext.Panel',
	xtype: 'beercomponent',
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

		var me = this,
		backBeerSelectButton = {
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'back_beerselect_btn',
			handler: this.onBackBeerSelectButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_BEER,
			id: 'BeerSelectTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backBeerSelectButton
			]
		},
		selectbeerfavorite= {
			xtype: 'selectfield',
			name: "selectbeerfavorite",
			id: "selectfieldbeerfavorite",
			cls: 'beer_form_selectfield',
			placeHolder: i18n.app.HINT_BEERCHOOSE,
			store: Ext.getStore("FavoriteBeers_Local"),
			valueField: "beerName",
			displayField: "beerName",
			docked: 'top'
		},
		beercomponent = {
			xtype: 'beercomponent'
		},
		beerList = {
			xtype: "beerlist",
			id: "beerlistselect",
			store: null,
			singleSelect: true
		};

		this.add([toolbar, selectbeerfavorite, beercomponent, beerList]);
	},
	onBackBeerSelectButtonTap: function(){
		this.fireEvent("backBeerSelectCommand", this);
	}
});

