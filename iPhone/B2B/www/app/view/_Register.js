Ext.define('B2B.view._Register', {
	extend: 'Ext.form.Panel',
	id: '_register',
	xtype: '_register',
	config: {
		iconCls: 'settings6',
		url: 'http://192.168.1.161',
		styleHtmlContent: true,
		html:'Cannot login? <a href="#">Send me my credentials via email!</a>',
		items: [
			{
				xtype: 'fieldset',
				margin: '50px auto',
				id: '_loginfieldset',
				items:[
					{
						xtype: 'hiddenfield',
						name: 'dateRequest',
						value: new Date()
					},
					{
						xtype: 'textfield',
						id: 'registerform_displayname',
						name: 'displayName',
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
						xtype: 'passwordfield',
						id: 'registerform_password',
						name: 'password',
						placeHolder: i18n.app.PLACEHOLDER_PASSWORD,
						listeners: {
		                    keyup: function(fld, e){
		                        if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
		                            e.stopEvent();
		                            fld.element.dom.blur();
		                            window.scrollTo(0,0);
		                        }
		                    }
		                }
					}
				]
			}
		],
		listeners : {           
            element : 'element',
            delegate : 'a',
            tap : function(e, t) {
          		console.log("TEST");
          		/* TODO: sta cosa non funziona */
          		e.preventDefault();
          		e.stopPropagation();
     		}
     	}
	},
	initialize: function(){
        this.callParent(arguments);
        
		var button_Register = {
			xtype: 'button',
			id: 'BTN_login',
            width: 150,
            text: 'Log In',
            margin: '15px auto',
            ui: 'action',
            text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
		}

        Ext.getCmp('_registerfieldset').add([ button_Register]);
    },
    
    onLoginButtonTap: function(){
        this.fireEvent("registerCommand", this);
    }
    
});