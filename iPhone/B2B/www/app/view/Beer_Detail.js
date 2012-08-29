Ext.define('B2B.view.Beer_Detail', {
	extend: 'Ext.form.Panel',
	id: 'BeerDetail',
	xtype: 'beerdetailpanel',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_BEERDETAIL,
		iconCls: 'add'
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backBeerDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'beerdetail_back_btn',
			handler: this.onBeerDetailBackButtonTap,
			scope: this
		};

		var reportBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BEERREPORT,
			ui: 'action',
			id: 'beer_report_btn',
			handler: this.onBeerReportButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backBeerDetailButton,
				{ xtype: 'spacer' },
				reportBeerButton
			]
		};

		var reportBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BEERREPORT,
			ui: 'action',
			id: 'beer_report_btn',
			handler: this.onBeerReportButtonTap,
			scope: this
		};

		var addBeerFavoriteButton = {
			xtype: "button",
			text: i18n.app.BTN_ADDBEERFAVORITE,
			ui: 'action',
			id: 'favorites_addbeer_btn',
			handler: this.onFavoritesAddBeerButtonTap,
			scope: this,
			//docked: 'bottom'
		};

		var container = {
			xtype: 'container',
			html: this.getStringHTMLFromValues(this.jsonData.data)
		}
		this.add([toolbar, container, addBeerFavoriteButton]);
		
	}, 
	getStringHTMLFromValues: function(info){
		var value = '';

		if (info.image !== null && info.image !== '') {
		   value += '<img id="beer_thumbnail" src="' + info.image +'" /><hr />';
		}
		
		value += '<p>' + i18n.app.LABEL_BEERNAME + ': <span>' + _.titleize(info.name) + '</span></p>';
		if(info.brewery) value+= '<p>' + i18n.app.LABEL_BEERBREWERY + ': <span>' + _.titleize(info.brewery) + '</span></p>';
		if(info.beerstyle) value += '<p>' + i18n.app.LABEL_BEERSTYLE + ': <span>' + utils.getBeerStyleFromCode(parseInt(info.beerstyle)) + '</span></p>';
		if(info.beertype) value += '<p>' + i18n.app.LABEL_BEERTYPE + ': <span>' + utils.getBeerTypeFromCode(parseInt(info.beertype)) + '</span></p>';
		if(info.grad) value += '<p>' + i18n.app.LABEL_BEERGRAD + ': <span>' + info.grad + '</span></p>';
		if(info.nationality) value += '<p>' + i18n.app.LABEL_BEERNATIONALITY + ': <span>' + utils.getCountryFromCode(info.nationality) + '</span></p>';
		if(info.description) value += '<p>' + i18n.app.LABEL_BEERDESCRIPTION + ': <span>' + info.description + '</span></p>';
		return value;
	},
	onBeerReportButtonTap: function(){
		this.fireEvent("reportBeerCommand", this);
	},
	onFavoritesAddBeerButtonTap: function(){
		this.fireEvent("addFavoriteBeerCommand", this, this.jsonData.data);
	},
	onBeerDetailBackButtonTap: function(){
		this.fireEvent("backBeerDetailCommand", this);
	}
});

