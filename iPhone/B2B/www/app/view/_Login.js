Ext.define('B2B.view._Login', {
	extend: 'Ext.form.Panel',
	id: '_login',
	xtype: '_login',
	config: {
		iconCls: 'settings6',
		url: 'http://192.168.1.161',
		styleHtmlContent: true,
		html:'Cannot login? <a href="#">Send me my credentials via email!</a>',
		items: [
			{
				xtype: 'fieldset',
				width: 380,
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
						id: 'loginform_username',
						name: 'username',
						placeHolder: i18n.app.PLACEHOLDER_USERNAME,
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
						id: 'loginform_password',
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
        
		var button_Login = {
			xtype: 'button',
			id: 'BTN_login',
            width: 150,
            text: 'Log In',
            margin: '15px auto',
            ui: 'action',
            text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
		}

        Ext.getCmp('_loginfieldset').add([ button_Login]);
    },
    
    onLoginButtonTap: function(){
        this.fireEvent("loginCommand", this);
    }
    
});