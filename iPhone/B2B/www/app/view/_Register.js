Ext.define('B2B.view._Register', {
	extend: 'Ext.form.Panel',
	id: '_register',
	xtype: '_register',
	config: {
		iconCls: 'settings6',
		url: HH.IP_PORT_SERVER,
		styleHtmlContent: true,
		items: [
			{
				xtype: 'fieldset',
				margin: '50px auto',
				id: '_registerfieldset',
				items:[
					{
						xtype: 'hiddenfield',
						name: 'idUser'
					},
					{
						xtype: 'textfield',
						id: 'registerform_email',
						name: 'email',
						label: i18n.app.FORM_EMAIL,
						labelWidth: '40%',
						placeHolder: i18n.app.PLACEHOLDER_EMAIL,
						listeners: {
						keyup: function(fld, e){
							if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
									e.stopEvent();
									fld.element.dom.blur();
									window.scrollTo(0,0);
								}
							}
					   }
					},
					{
						xtype: 'textfield',
						id: 'registerform_displayname',
						name: 'displayName',
					    label: i18n.app.FORM_DISPLAYNAME,
					    labelWidth: '40%',
						placeHolder: i18n.app.PLACEHOLDER_DISPLAYNAME,
						listeners: {
		                    keyup: function(fld, e){
		                        if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
		                            e.stopEvent();
		                            fld.element.dom.blur();
		                            window.scrollTo(0,0);
		                        }
		                    }
		                }
					},
					{
					   xtype: 'selectfield',
					   name: 'gender',
					   label: i18n.app.FORM_GENDER,
					   labelWidth: '40%',
					   placeHolder: i18n.app.HINT_CHOOSEGENDER,
					   title: i18n.app.HINT_CHOOSEGENDER,
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
						xtype: 'datepickerfield',
						destroyPickerOnHide: true,
						name: 'birthDay',
						label: i18n.app.FORM_BIRTHDATE,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSEBIRTHDATE,
						yearFrom: 1940
					},
					{
						xtype: 'selectfield',
						name: "nationality",
						cls: "nationality",
						label: i18n.app.FORM_NATIONALITY,
						labelWidth: '40%',
						placeHolder: i18n.app.HINT_CHOOSENATIONALITY,
						options: i18n.countries
					}
				]
			}
		]
	},
	initialize: function(){
        this.callParent(arguments);

		var button_Register = {
			xtype: 'button',
			id: 'btn_register',
            width: 150,
            margin: '15px auto',
            ui: 'action',
            text: utils.__(i18n.app.BTN_REGISTER),
			handler: this.onRegisterButtonTap
		}

        Ext.getCmp('_registerfieldset').add([ button_Register]);
    },

    onRegisterButtonTap: function(){
    	var values = Ext.getCmp("_register").getValues();
        this.fireEvent("registerCommand", this, values);
    }
});