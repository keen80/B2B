Ext.define('B2B.view.User_Profile_About', {
	extend: 'Ext.Container',
	xtype: 'userprofileaboutpanel',
    id: "userprofileaboutpanel",

	config: {
		title: i18n.app.PANEL_ABOUTME,
		iconCls: 'user',
		styleHtmlContent: true,
        scrollable: true

	},
	initialize: function(){
        
        this.callParent(arguments);

        var editProfileButton = {
            text: i18n.app.BTN_EDIT,
            ui: 'action',
            id: 'edit_profile_btn',
            handler: this.onEditProfileButtonTap,
            scope: this
        };

        var toolbar = {
            xtype: 'toolbar',
            cls: "sub_titlebar",
            docked: 'top',
            id: 'AboutTitlebar',
            ui: 'neutral',
            defaults: {
                iconMask: true
            },
            items: [
                { xtype: 'spacer' },
                editProfileButton
            ]
        };

        var profile_container = {
            xtype: 'fieldset',
            title: i18n.app.FORM_ACCOUNT,
            items: [
                {
                    xtype: 'panel',
                    html: [
                        '<img class="avatar_medium" height="48" width="48" src="'+HH.default_user48+'" />',
                        '<div class="profile_right">',
                        '<p id="profile_username"></p>',
                        '<p id="profile_firstname"></p>',
                        '<p id="profile_lastname"></p>',
                        '<div>'
                    ].join("") 
                },
            ]
        };
        this.add([ toolbar, profile_container ]);
       // this.refreshProfileData();
    },
    onEditProfileButtonTap: function(){
        this.fireEvent("editProfileCommand", this);
    },
    refreshProfileData: function(){
        this.fireEvent("reloadProfileCommand", this);
    }
});