Ext.define('B2B.view.User_Profile_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'userprofileform',
	id: 'userprofileform',
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
				xtype: 'panel',
   				layout:{
				    type:'hbox',
				    align: 'strech'
				},
   				defaults:{flex:'1'},
  				items: [
	  				{
			            xtype: 'image',
			            src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
			            width: 80,
			            mode: 'element',
	                    listeners: {
	                        tap: function (img, evt) {
		                        if(!this.actions){
		                        	this.actions = Ext.Viewport.add(
		                        		{	
			                        		xtype: 'actionsheet',
			                        		items: [
			                        			{
			                        				text: i18n.app.BTN_CHOOSEPICTURE,
			                        				scope: this,
			                        				ui: 'confirm',
			                        				handler: function(){
			                        					Ext.getCmp("userprofileform").fireEvent("chooseProfilePictureCommand", this);
			                        					this.actions.hide();
			                        				}
			                        			},
			                        			{
			                        				text: i18n.app.BTN_REMOVEPICTURE,
			                        				scope: this,
			                        				ui: 'decline',
			                        				handler: function(){
			                        					Ext.getCmp("userprofileform").fireEvent("removeProfilePictureCommand", this);
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
			        },
					{
						xtype: 'fieldset',
						title: i18n.app.FORM_ACCOUNT,
						instructions: i18n.app.HINT_DISPLAYNAME,
						flex: 1,
						items: [
							{
								xtype: 'hiddenfield',
								name: 'idUser'
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
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'email',
								label: i18n.app.FORM_EMAIL,
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'displayName',
								label: i18n.app.FORM_DISPLAYNAME
							}
						]
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
						placeHolder: i18n.app.HINT_CHOOSEFIRSTNAME,
					},
					{
						xtype: 'textfield',
						name: 'lastName',
						label: i18n.app.FORM_LASTNAME,
					},
					{
						xtype: 'textfield',
						name: 'description',
						label: i18n.app.FORM_DESCRIPTION,
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDay',
						label: i18n.app.FORM_BIRTHDATE,
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "gender",
						label: i18n.app.FORM_GENDER,
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
						disabled: true
					},
					{
						xtype: 'textfield',
						name: 'lastLoginOn',
						id: 'lastLoginOnField',
						label: i18n.app.FORM_LASTLOGINON,
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
            id: 'save_profile_btn',
            handler: this.onSaveProfileButtonTap,
            scope: this
        };

        var backProfileButton = {
            text: i18n.app.BTN_BACK,
            ui: 'back',
            id: 'back_profile_btn',
            handler: this.onBackProfileButtonTap,
            scope: this
        };


        var toolbar = {
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
        this.fireEvent("saveProfileCommand", this);
    },
    onBackProfileButtonTap: function(){
        this.fireEvent("backProfileCommand", this);
    }
});