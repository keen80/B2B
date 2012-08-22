Ext.define('B2B.view._Login', {
	extend: 'Ext.form.Panel',
	id: '_login',
	xtype: '_login',
	config: {
		iconCls: 'settings6',
		url: '/cippa.php'
	},
	initialize: function(){
        this.callParent(arguments);

		var button_Login = {
			xtype: 'button',
			id: 'BTN_login',
			text: utils.__(i18n.app.BTN_LOGIN),
			handler: this.onLoginButtonTap
		}

        this.add([ button_Login]);
    },
    onLoginButtonTap: function(){
        this.fireEvent("loginCommand", this);
    }
});