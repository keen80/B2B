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

		var savePreferencesButton = {
			text: i18n.app.BTN_SAVE,
			ui: 'action',
			id: 'save_preferences_btn',
			handler: this.onSavePreferencesButtonTap,
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
					listeners: {
						change: function (slider, thumb, newValue, oldValue) {
						   HH.log("Notification Toggle");
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

});