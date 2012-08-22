Ext.define('B2B.view.User_Profile_Privacy_Form', {
	extend: 'Ext.form.Panel',
	id: 'userprofileprivacyform',
	xtype: 'userprofileprivacyform',
	config: {
		title: i18n.app.PANEL_PRIVACY,
		iconCls: 'settings6',
		url: '/cippa.php'
	},
	initialize: function(){
        this.callParent(arguments);

        var toolbar = {
            xtype: 'titlebar',
            title: i18n.app.PANEL_PRIVACY,
            cls: "sub_titlebar",
            docked: 'top',
            id: 'PrivacyTitlebar',
            ui: 'neutral',
            defaults: {
                iconMask: true
            }
        };

        var fieldset_RemoveData = {
			xtype: 'fieldset',
			title: utils.__(i18n.app.FORM_PRIVACY),
			instructions: utils.__(i18n.app.HINT_CAREFULLY),
			items: [
				{
					xtype: 'panel',
					layout: 'vbox',
					items: [
						{
							xtype: 'button',
							id: 'BTN_removeData',
							text: utils.__(i18n.app.BTN_REMOVEPERSONAL),
							ui: 'decline-small',
							handler: this.onRemoveDataButtonTap
						}
					]
				}
			]
		}

		var button_Logout = {
			xtype: 'button',
			id: 'BTN_logOut',
			text: utils.__(i18n.app.BTN_LOGOUT),
			ui: 'decline',
			handler: this.onLogoutButtonTap
		}

        this.add([toolbar, fieldset_RemoveData, button_Logout]);
    },
    onRemoveDataButtonTap: function(){
        this.fireEvent("privacyRemoveDataCommand", this);
    },
    onLogoutButtonTap: function(){
        this.fireEvent("privacyLogoutCommand", this);
    }
});