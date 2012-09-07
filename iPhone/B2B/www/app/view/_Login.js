Ext.define('B2B.view._Login', {
	extend: 'Ext.form.Panel',
	id: '_login',
	xtype: '_login',
	config: {
		iconCls: 'settings6',
		styleHtmlContent: true,
		// html:'Cannot login? <a href="#">Send me my credentials via email!</a>',
		scrollable: false,
		layout: 'vbox',
		items: [
			{ xtype: 'spacer'},
			{
				xtype: 'fieldset',
				margin: '50px auto',
				id: '_loginfieldset',
			},
			{ xtype: 'spacer'}
		]
	},
	initialize: function(){
        this.callParent(arguments);

		var button_Login = {
			xtype: 'button',
			id: 'btn_login',
            width: 150,
            text: 'Log In',
            margin: '15px auto',
            ui: 'action',
            text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
		}

        Ext.getCmp('_loginfieldset').add([button_Login]);
    },

    onLoginButtonTap: function(){
        this.fireEvent("loginCommand", this);
    }

});