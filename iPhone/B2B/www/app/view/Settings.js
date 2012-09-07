Ext.define('B2B.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype: 'settings',
	config: {
		title: i18n.app.PANEL_SETTINGS,
		iconCls: 'settings6',
		url: '/cippa.php'
	},
	initialize: function(){
        this.callParent(arguments);

        var cancelButton = {
			text: i18n.app.BTN_BACK,
			ui: 'action',
			id: 'cancel_settings_btn',
			handler: this.onBackButtonTap,
			scope: this
		},
        toolbar = {
            xtype: 'titlebar',
            title: i18n.app.PANEL_SETTINGS,
            cls: "sub_titlebar",
            docked: 'top',
            id: 'SettingsTitlebar',
            ui: 'neutral',
            defaults: {
                iconMask: true
            },
            items: [
            	cancelButton
            ]
        },
        fieldset_Settings = {
			xtype: 'fieldset',
			title: i18n.app.FORM_SETTINGS,
			items: [
				{
					xtype: 'iostogglefield',
					name: 'enableNotification',
					label: i18n.app.FORM_NOTIFICATIONENABLE,
					labelWidth: '50%',
					listeners: {
						change: function (slider, thumb, newValue, oldValue) {
						   HH.log("TODO: Notification Toggle");
						}
					}
				}
			]
		},

		privacyremovedata = {
			xtype: 'button',
			id: 'privacyremovedatabtn',
			text: utils.__(i18n.app.BTN_REMOVEPERSONAL),
			ui: 'decline-small',
			handler: this.onRemoveDataButtonTap,
			scope: this
		},
        
        fieldset_RemoveData = {
			xtype: 'fieldset',
			title: utils.__(i18n.app.FORM_PRIVACY),
			instructions: utils.__(i18n.app.HINT_CAREFULLY),
			items: [
				privacyremovedata
			]
		},
		button_Logout = {
			xtype: 'button',
			id: 'logoutbtn',
			text: utils.__(i18n.app.BTN_LOGOUT),
			ui: 'decline',
			handler: this.onLogoutButtonTap,
			scope: this
		};

        this.add([toolbar, fieldset_Settings, fieldset_RemoveData, button_Logout]);
    },
    onRemoveDataButtonTap: function(){
        this.fireEvent("removeDataCommand", this);
    },
    onLogoutButtonTap: function(){
        this.fireEvent("logoutCommand", this);
    },
    onBackButtonTap: function(){
    	this.fireEvent("settingsBackCommand", this);
    }
});