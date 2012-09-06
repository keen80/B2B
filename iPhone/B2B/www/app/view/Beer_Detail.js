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

		var info = this.jsonData.data;

		var backBeerDetailButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'beerdetail_back_btn',
			handler: this.onBeerDetailBackButtonTap,
			scope: this
		},
		reportBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BEERREPORT,
			ui: 'action',
			id: 'beer_report_btn',
			handler: this.onBeerReportButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backBeerDetailButton,
				{ xtype: 'spacer' },
				reportBeerButton
			]
		},
		addbeerfavorite = {
			xtype: "button",
			text: i18n.app.BTN_FAVORITE,
			ui: 'small',
			iconCls: 'favorites',
			iconMask: true,
			margin: 2,
			id: 'addbeerfavorite',
			handler: this.onFavoritesAddBeerButtonTap,
			flex: 1,
			scope: this,
		},
		findbeeraroundme = {
			xtype: "button",
			text: i18n.app.BTN_FAVORITE,
			ui: 'small',
			iconCls: 'favorites',
			iconMask: true,
			margin: 2,
			id: 'findbeeraroundme',
			handler: this.onFavoritesAddBeerButtonTap,
			flex: 1,
			scope: this,
		},
		controlcontainer ={
			xtype: 'container',
			 layout: {
		        type: 'hbox',
		        align: 'center'
		    },
			items:[
				addbeerfavorite,
				findbeeraroundme
			]
		};

		var beerfieldset = {
				xtype: 'fieldset',
				title: i18n.app.FORM_BEERDETAIL,
				instructions: i18n.app.HINT_BEERREPORT,
				items: [
					{
						xtype: 'textfield',
						name: 'name',
						readOnly: true,
						cls: 'beer_form_textfield',
						value: _.titleize(info.name),
						label: i18n.app.LABEL_BEERNAME
					},
					{
						xtype: 'textfield',
						name: 'brewery',
						readOnly: true,
						cls: 'beer_form_textfield',
						value: _.titleize(info.brewery),
						label: i18n.app.LABEL_BEERBREWERY
					},
					{
						xtype: 'textfield',
						name: "beerstyle",
						readOnly: true,
						cls: 'beer_form_textfield',
						label: i18n.app.LABEL_BEERSTYLE,
						value: utils.getBeerStyleFromCode(parseInt(info.beerstyle))
					},
					{
						xtype: 'textfield',
						name: "beertype",
						readOnly: true,
						cls: 'beer_form_textfield',
						label: i18n.app.LABEL_BEERTYPE,
						value: utils.getBeerTypeFromCode(parseInt(info.beertype))
					},
					{
						xtype: 'textfield',
						name: "grad",
						readOnly: true,
						cls: 'beer_form_textfield',
						label: i18n.app.LABEL_BEERGRAD,
						value: info.grad
					},
					{
						xtype: 'textfield',
						name: "nationality",
						readOnly: true,
						cls: 'beer_form_textfield field_nationality_'+(info.nationality).toLowerCase(),
						label: i18n.app.FORM_NATIONALITY,
						value: utils.getCountryFromCode(info.nationality)
					},
					{
						xtype: 'textareafield',
						name: 'description',
						cls: 'beer_form_textfield',
						labelAlign: 'top',
						readOnly: true,
						label: i18n.app.LABEL_BEERDESCRIPTION,
						value: info.description
					}
				]
		};

		this.add([toolbar, controlcontainer, beerfieldset]);

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
		this.fireEvent("addFavoriteBeerCommand", this, this.info.data);
	},
	onBeerDetailBackButtonTap: function(){
		this.fireEvent("backBeerDetailCommand", this);
	}
});

