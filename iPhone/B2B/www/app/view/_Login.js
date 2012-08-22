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
						placeHolder: i18n.app.PLACEHOLDER_USERNAME
					},
					{
						xtype: 'passwordfield',
						id: 'loginform_password',
						name: 'password',
						placeHolder: i18n.app.PLACEHOLDER_PASSWORD
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
			text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
		}

        Ext.getCmp('_loginfieldset').add([ button_Login]);
    },
    
    onLoginButtonTap: function(){
        this.fireEvent("loginCommand", this);
    }
    
});