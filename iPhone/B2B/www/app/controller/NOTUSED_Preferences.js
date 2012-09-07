Ext.define("B2B.controller.Preferences", {
	extend: "Ext.app.Controller",
	id: "Preferences",
	config: {
		refs: {
			preferencesForm: "userpreferencesform",
			app: "_app"
		},
		control: {
			preferencesForm: {
				showPreferencesCommand: "onShowPreferencesForm",
				savePreferencesCommand: "onSavePreferences",
				backPreferencesCommand: "onBackPreferences",
				toggleTwitterCommand: "onChangeTwitter",
				toggleFacebookCommand: "onChangeFacebook"
			}
		}
	},
	onInitialize: function(){
		/* Got from the profile our option to SHARE on FACEBOOK / TWITTER */
		this.onChangeTwitter(null, Ext.getStore("Profile").first().data.shareTwitter);
		this.onChangeFacebook(null, Ext.getStore("Profile").first().data.shareFacebook);
	},
	onShowPreferencesForm: function(){
		var preferencesForm = this.getPreferencesForm();
		preferencesForm.reset();
		preferencesForm.setRecord(Ext.getStore('Profile_Ajax').first());
	},
	onChangeTwitter: function(a, what){
		/* on Checkbox change we show a credentials */
		if(what){
			var credentialsTwitter = {
				xtype: 'fieldset',
				id: "fieldset_twitter",
				title: i18n.app.PANEL_TWITTER,
				items: [
					{
						xtype: 'textfield',
						name: 'username_twitter',
						label: i18n.app.FORM_USERNAME
					},
					{
						xtype: 'passwordfield',
						name: 'password_twitter',
						label: i18n.app.FORM_PASSWORD
					}
				]
		    };
        	Ext.getCmp("userpreferencesform").add( credentialsTwitter );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_twitter'), true );
        }
	},
	onChangeFacebook: function(a, what){
		/* on Checkbox change we show a credentials */
		if(what){
			var credentialsFacebook = {
				xtype: 'fieldset',
				id: "fieldset_facebook",
				title: i18n.app.PANEL_FACEBOOK,
				items: [
					{
						xtype: 'textfield',
						name: 'username_password',
						label: i18n.app.FORM_USERNAME
					},
					{
						xtype: 'passwordfield',
						name: 'password_password',
						label: i18n.app.FORM_PASSWORD
					}
				]
			};
        	Ext.getCmp("userpreferencesform").add( credentialsFacebook );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_facebook'), true );
        }
	},
	onSavePreferences: function(){
		this.closePanel();
	},
	onBackPreferences: function() {
		var profileContainer = Ext.getCmp('userprofile');
		profileContainer.remove(Ext.getCmp('userpreferencesform'));
	},
	closePanel: function() {
		var maninPanel = Ext.getCmp("userprofile");
		maninPanel.animateActiveItem(0, {
			type:'slide',
			direction:'down'
		});
	},
	init: function(){
		this.callParent(arguments);
	}
});



