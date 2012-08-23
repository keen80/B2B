Ext.define('B2B.view.Beer_Add_Form', {
	extend: 'Ext.form.Panel',
	id: 'BeerAddForm',
	xtype: 'beeraddform',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select',
        'Ext.ux.starrating.StarRating',
    ],
	config: {
		title: i18n.app.PANEL_ADDBEER,
		iconCls: 'add',
		defaults: {
			labelAlign: 'left',
			labelWidth: '50%',
			labelHeight: '50%'
		},
		items: [
			{
				xtype: 'textfield',
				name: 'name',
				placeHolder: i18n.app.HINT_BEERCHOOSENAME,
				label: i18n.app.LABEL_BEERNAME,
				required: true
			},
			{
				xtype: 'textfield',
				name: 'brewery',
				placeHolder: i18n.app.HINT_BEERCHOOSEBREWERY,
				label: i18n.app.LABEL_BEERBREWERY,
				required: true
			},
			{
				xtype: 'selectfield',
				name: "beerstyle",
				cls: "beer_style",
				placeHolder: i18n.app.HINT_BEERCHOOSESTYLE,
				label: i18n.app.LABEL_BEERSTYLE,
				options: i18n.beerstyles
			},
			{
				xtype: 'selectfield',
				name: "grad",
				cls: "beer_grad",
				label: i18n.app.LABEL_BEERGRAD,
				placeHolder: i18n.app.HINT_BEERCHOOSESTYLE,
				usePicker: true,
				options: i18n.beergrads
			},
			{
				xtype: 'selectfield',
				name: "nationality",
				cls: "nation",
				label: i18n.app.FORM_NATIONALITY,
				options: i18n.countries
			},
			{
				xtype: 'starrating',
			    itemsCount : 5,
			    name: "param1",
			    label : 'Rating',
			    inputCls : 'x-rating-star-input',
			    itemCls : 'x-rating-star',
			    itemHoverCls : 'x-rating-star-hover'
			},
			{
				xtype: 'textareafield',
				name: 'description',
				label: i18n.app.LABEL_BEERDESCRIPTION
			}
		]
	},
	initialize: function(){

    	this.callParent(arguments);

    	var backBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'beer_back_btn',
			handler: this.onBeerBackButtonTap,
			scope: this
		};

		var saveBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			id: 'beer_save_btn',
			handler: this.onBeerSaveButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_ADDBEERPANEL,
			docked: 'top',
			items: [
				backBeerButton,
				{
					xtype: 'spacer'
				},
				saveBeerButton
			]
		};

		this.add([toolbar]);

    },
	onBeerSaveButtonTap: function(){
		this.fireEvent("beerSaveCommand", this);
	},
	onBeerBackButtonTap: function(){
		this.fireEvent("beerBackCommand", this);
	}
});