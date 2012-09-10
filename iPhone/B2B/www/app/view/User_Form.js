Ext.define('B2B.view.User_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'userform',
	id: 'userform',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Hidden',
		'Ext.field.DatePicker',
		'Ext.field.Select',
		'Ext.field.Toggle',
		'Ext.Img',
		'Ext.ActionSheet'
	],
	config: {
		title: i18n.app.PANEL_PROFILEEDIT,
		iconCls: 'settings6',
		url: '/cippa.php',
		items: [
			{
				xtype: 'fieldset',
				title: i18n.app.FORM_ACCOUNT,
				instructions: i18n.app.HINT_DISPLAYNAME,
				items: [
					{
						xtype: 'hiddenfield',
						name: 'idUser'
					},
					{
						xtype: 'hiddenfield',
						name: 'idFacebook'
					},
					{
						xtype: 'hiddenfield',
						name: 'pwdHash'
					},
					{
						xtype: 'hiddenfield',
						name: 'role'
					},
					{
						xtype: 'hiddenfield',
						name: 'status'
					},
					{
						xtype: 'textfield',
						name: 'username',
						label: i18n.app.FORM_USERNAME,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'field',
						label: i18n.app.FORM_AVATAR,
						labelAlign: 'top',
						component:
						{
							xtype: 'image',
							name: 'image',
							id : 'profileformimage',
							// TODO AVATAR IMAGE
							src: HH.default_user64,
							mode: 'element',
							listeners: {
								tap: function (img, evt) {
									if(!this.actions){
										this.actions = Ext.Viewport.add(
											{
												xtype: 'actionsheet',
												zIndex: 9999,	// Evita il problema di visualizzazione della actionsheet sotto alle viste
												items: [
													{
														text: i18n.app.BTN_CHOOSEPICTURE,
														scope: this,
														ui: 'confirm',
														handler: function(){
															Ext.getCmp("userform").fireEvent("chooseProfilePictureCommand", this, Ext.getCmp("profileformimage"));
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_REMOVEPICTURE,
														scope: this,
														ui: 'decline',
														handler: function(){
															Ext.getCmp("profileformimage").setSrc(HH.default_user64);
															this.actions.hide();
														}
													},
													{
														text: i18n.app.BTN_CANCEL,
														scope: this,
														handler: function(){
															this.actions.hide();
														}
													}
												]
											}
										);
									}
									this.actions.show();
								}
							}
						}
					},
					{
						xtype: 'textfield',
						name: 'email',
						label: i18n.app.FORM_EMAIL,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'displayName',
						label: i18n.app.FORM_DISPLAYNAME,
						labelWidth: '40%'
					}
				]
			},
			{
				xtype: 'fieldset',
				title: i18n.app.FORM_PROFILE,
				items: [
					{
						xtype: 'textfield',
						name: 'firstName',
						label: i18n.app.FORM_FIRSTNAME,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEFIRSTNAME,
					},
					{
						xtype: 'textfield',
						name: 'lastName',
						label: i18n.app.FORM_LASTNAME,
						labelWidth: '40%'
					},
					{
						xtype: 'textfield',
						name: 'description',
						label: i18n.app.FORM_DESCRIPTION,
						labelAlign: 'top'
						//labelWidth: '40%'
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDate',
						label: i18n.app.FORM_BIRTHDATE,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "gender",
						label: i18n.app.FORM_GENDER,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEGENDER,
						options: [
							{
								text: i18n.app.LABEL_UNDISCLOSED,
								value: 0
							},
							{
								text: i18n.app.LABEL_MALE,
								value: 1
							},
							{
								text: i18n.app.LABEL_FEMALE,
								value: 2
							}
						]
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						cls: "nation",
						label: i18n.app.FORM_NATIONALITY,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSENATIONALITY,
						options: i18n.countries
					}
				]
			},
			{
				xtype: "fieldset",
				items: [
					{
						xtype: 'textfield',
						name: 'activatedOn',
						id: 'activatedOnField',
						label: i18n.app.FORM_ACTIVATEDON,
						labelWidth: '40%',
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'lastLoginOn',
						id: 'lastLoginOnField',
						label: i18n.app.FORM_LASTLOGINON,
						labelWidth: '40%',
						disabled: true
					}
				]
			}
		]
	},
	initialize: function(){

		this.callParent(arguments);

		var saveProfileButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			iconCls: 'check_yes',
			id: 'save_profile_btn',
			handler: this.onSaveProfileButtonTap,
			scope: this
		},
		backProfileButton = {
			text: i18n.app.BTN_CANCEL,
			ui: 'back',
			id: 'back_profile_btn',
			handler: this.onBackProfileButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_PROFILEEDIT,
			id: 'ProfileFormTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backProfileButton,
				{ xtype: 'spacer' },
				saveProfileButton
			]
		};

		this.add([toolbar]);
	},
	onSaveProfileButtonTap: function(){
		var values = this.getValues();
		this.fireEvent("saveProfileCommand", this, values);
	},
	onBackProfileButtonTap: function(){
		this.fireEvent("backProfileCommand", this);
	}
});