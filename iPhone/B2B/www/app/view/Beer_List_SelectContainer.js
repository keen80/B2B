Ext.define('B2B.view.Beer_List_SelectContainer', {
	extend: 'Ext.Panel',
	xtype: 'beerlistselectcontainerpanel',
	id: "beerlistselectcontainer",
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

		var backBeerSelectButton = {
          text: i18n.app.BTN_BACK,
          ui: 'back',
          id: 'back_beerselect_btn',
          handler: this.onBackBeerSelectButtonTap,
          scope: this
	      };

	      var toolbar = {
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
	    };

		var selectbeerfavorite= {
			xtype: 'selectfield',
			name: "selectbeerfavorite",
			id: "selectfieldbeerfavorite",
			cls: 'beer_form_selectfield',
			placeHolder: i18n.app.HINT_BEERCHOOSE,
			//label: i18n.app.LABEL_BEERSTYLE,
			store: Ext.getStore("FavoriteBeers_Local"),
			valueField: "beerName",
			docked: 'top'
		};

		var beerlistselectsearchcomponent = {
			xtype: 'beerlistselectsearchcomponent',
		};

		var beerList = {
		    xtype: "beerlistcomponent",
		    id: "beerlistselect",
		   	store: null,
		    singleSelect: true
		};

		this.add([toolbar, selectbeerfavorite, beerlistselectsearchcomponent, beerList]);
	},
	onBackBeerSelectButtonTap: function(){
		this.fireEvent("backBeerSelectCommand", this);
	}
});

