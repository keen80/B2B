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

Ext.define("B2B.controller.Preferences", {
	extend: "Ext.app.Controller",
	id: "Preferences",
	config: {
		refs: {
			preferencesForm: "userpreferencesform",
			appContainer: "App_Container",
			app: "_app"
		},
		control: {
			preferencesForm: {
				showPreferencesCommand: "onShowPreferencesForm",
				toggleTwitterCommand: "onChangeTwitter",
				toggleFacebookCommand: "onChangeFacebook"
			}
		}
	},
	onInitialize: function(){
		console.log(Ext.getStore("Profile").first().data.shareTwitter);
		console.log(Ext.getStore("Profile").first().data.shareFacebook);
		this.onChangeTwitter(null, Ext.getStore("Profile").first().data.shareTwitter);
		this.onChangeFacebook(null, Ext.getStore("Profile").first().data.shareFacebook);
	},
	onShowPreferencesForm: function(){
		console.log("asdsads");
		var preferencesForm = this.getPreferencesForm();
		preferencesForm.reset();
		preferencesForm.setRecord(Ext.getStore('Profile_Ajax').first());
	},
	onChangeTwitter: function(a, what){
		if(what){
        	Ext.getCmp("userpreferencesform").add( credentialsTwitter );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_twitter'), true );
        }
	},
	onChangeFacebook: function(a, what){
		if(what){
        	Ext.getCmp("userpreferencesform").add( credentialsFacebook );
        }else{
        	Ext.getCmp("userpreferencesform").remove( Ext.getCmp('fieldset_facebook'), true );
        }
	},
	init: function(){
		this.callParent(arguments);
	}
});



