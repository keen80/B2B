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


        var header = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        };

		var selectbeerfavorite= {
			xtype: 'selectfield',
			name: "selectbeerfavorite",
			id: "selectfieldbeerfavorite",
			cls: 'beer_form_selectfield',
			placeHolder: i18n.app.HINT_BEERCHOOSE,
			//label: i18n.app.LABEL_BEERSTYLE,
			store: Ext.getStore("FavoriteBeers_Local"),
			valueField: "beerName"
		};

		var beerlistsearchcomponent = {
			xtype: 'beerlistsearchcomponent',
		};

		var beerList = {
		    xtype: "beerlistcomponent",
		    id: "beerlistselect",
		   	store: null,
		    singleSelect: true
		};

		this.add([ header, selectbeerfavorite, beerlistsearchcomponent,beerList]);
	}
});

