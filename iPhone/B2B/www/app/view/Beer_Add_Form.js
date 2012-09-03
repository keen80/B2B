Ext.define('B2B.view.Beer_Add_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'beeraddform',
	requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.field.Select'
    ],
	config: {
		title: i18n.app.PANEL_ADDBEER,
		iconCls: 'add',
		submitOnAction: true,
		defaults: {
			labelAlign: 'left',
			labelWidth: '50%',
			labelHeight: '50%'
		},
		items: [
			{
				xtype: 'fieldset',
				title: i18n.app.FORM_ADDBEER,
				instructions: i18n.app.HINT_ADDBEER,
				items: [
					{
						xtype: 'textfield',
						name: 'name',
						cls: 'beer_form_textfield',
						placeHolder: i18n.app.HINT_BEERCHOOSENAME,
						//label: i18n.app.LABEL_BEERNAME,
						required: true
					},
					{
						xtype: 'textfield',
						name: 'brewery',
						cls: 'beer_form_textfield',
						placeHolder: i18n.app.HINT_BEERCHOOSEBREWERY,
						//label: i18n.app.LABEL_BEERBREWERY,
						required: true
					},
					{
						xtype: 'selectfield',
						name: "beerstyle",
						id: "selectfieldbeerstyle",
						cls: 'beer_form_selectfield',
						placeHolder: i18n.app.HINT_BEERCHOOSESTYLE,
						//label: i18n.app.LABEL_BEERSTYLE,
						options: i18n.beerstyles
					},
					{
						xtype: 'selectfield',
						name: "grad",
						id: "selectfieldgrad",
						cls: 'beer_form_selectfield',
						//label: i18n.app.LABEL_BEERGRAD,
						placeHolder: i18n.app.HINT_BEERCHOOSEGRAD,
						store: null,
						options: i18n.beergrads
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						id: "selectfieldnationality",
						cls: 'beer_form_selectfield',
						//label: i18n.app.FORM_NATIONALITY,
						placeHolder: i18n.app.HINT_BEERCHOOSENATIONALITY,
						//options: i18n.countries
					},
					{
						xtype: 'textareafield',
						name: 'description',
						cls: 'beer_form_textfield',
						labelAlign: 'top',
						//label: i18n.app.LABEL_BEERDESCRIPTION,
						label: i18n.app.HINT_BEERCHOOSEDESCRIPTION,
						//placeHolder: i18n.app.HINT_BEERCHOOSEDESCRIPTION,
					}
				]
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
		Ext.getCmp("selectfieldnationality").setOptions(i18n.countries);

    },
	onBeerSaveButtonTap: function(){
		this.fireEvent("beerSaveCommand", this);
	},
	onBeerBackButtonTap: function(){
		this.fireEvent("beerBackCommand", this);
	}
});