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
		layout:{animation:false},
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
						options: i18n.beerstyles,
						value: 1
					},
					{
						xtype: 'selectfield',
						name: "grad",
						id: "selectfieldgrad",
						cls: 'beer_form_selectfield',
						placeHolder: i18n.app.HINT_BEERCHOOSEGRAD,
						options: i18n.beergrads,
						value: 1
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
    	var profile = (Ext.getStore('Profile_Local').first()).data;

    	var backBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_CANCEL,
			ui: 'back',
			id: 'beer_back_btn',
			handler: this.onBeerBackButtonTap,
			scope: this
		};

		var saveBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_SEND,
			ui: 'action',
			id: 'beer_save_btn',
			margin: '10px',
			handler: this.onBeerSaveButtonTap,
			scope: this,
			docked: 'bottom'
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_ADDBEERPANEL,
			docked: 'top',
			items: [
				backBeerButton
			]
		};

		this.add([toolbar, saveBeerButton]);
		var selectfieldnationality = Ext.getCmp("selectfieldnationality");
		selectfieldnationality.setOptions(i18n.countries);
		selectfieldnationality.setValue(profile.nationality);
    },
	onBeerSaveButtonTap: function(){
		this.fireEvent("beerSaveCommand", this);
	},
	onBeerBackButtonTap: function(){
		this.fireEvent("beerBackCommand", this);
	}
});