Ext.define('B2B.view.User_Preferences_Form', {
	extend: 'Ext.form.Panel',
	xtype: 'userpreferencesform',
	id: 'userpreferencesform',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Password'
	],
	config: {
		title: i18n.app.PANEL_PREFERENCES,
		iconCls: 'settings6',
		url: '/cippa.php'
	},

	initialize: function(){
		this.callParent(arguments);
		var me = this;

		var savePreferencesButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			id: 'save_preferences_btn',
			handler: this.onSavePreferencesButtonTap,
			scope: this
		},
		cancelButton = {
			text: i18n.app.BTN_CANCEL,
			ui: 'action',
			id: 'cancel_preferences_btn',
			handler: this.onCancelButtonTap,
			scope: this
		},
		toolbar = {
			xtype: 'toolbar',
			docked: 'top',
			cls: 'sub_titlebar',
			title: i18n.app.PANEL_PREFERENCES,
			id: 'PreferencesFormTitlebar',
			ui: 'neutral',
			defaults: {
				iconMask: true
			},
			items: [
				cancelButton,
				{ xtype: 'spacer' },
				savePreferencesButton
			]
		},
		notificationField = {
			xtype: 'fieldset',
			title: i18n.app.PANEL_NOTIFICATION,
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
		twitterToggle = {
			xtype: 'iostogglefield',
			id: 'twitterToggle',
			name: 'shareTwitter',
			label: i18n.app.FORM_SHARETWITTER,
			labelWidth: '50%',
			listeners: {
				change: function (slider, thumb, newValue, oldValue) {
					if (oldValue == 0) {
						me.onShareTwitterToggle(false)
					}
					else {
						me.onShareTwitterToggle(true)
					}
				}
			}
		},
		facebookToggle = {
			xtype: 'iostogglefield',
			id: 'facebookToggle',
			name: 'shareFacebook',
			label: i18n.app.FORM_SHAREFACEBOOK,
			labelWidth: '50%',
			listeners: {
				change: function (slider, thumb, newValue, oldValue) {
					if (oldValue == 0) {
						me.onShareFacebookToggle(false)
					}
					else {
						me.onShareFacebookToggle(true)
					}
				}
			}
		},
		fieldsetShare = {
			xtype: 'fieldset',
			title: i18n.app.PANEL_SHARE,
			id: "fieldset_share",
			items: [
				twitterToggle,
				facebookToggle
			]
		};

		this.add([toolbar, notificationField, fieldsetShare]);

	},
	activate: function(){
		this.fireEvent("showPreferencesCommand", this);
	},
	onSavePreferencesButtonTap: function(){
		this.fireEvent("savePreferencesCommand", this);
	},
	onShareTwitterToggle: function(what){
		this.fireEvent("toggleTwitterCommand", this, what);
	},
	onShareFacebookToggle: function(what){
		this.fireEvent("toggleFacebookCommand", this, what);
	},
	onCancelButtonTap: function() {
		this.fireEvent("backPreferencesCommand", this);
	}
});