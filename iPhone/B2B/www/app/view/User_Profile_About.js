Ext.define('B2B.view.User_Profile_About', {
	extend: 'Ext.Container',
	xtype: 'userprofileaboutpanel',

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

        this.add([toolbar]);
    },

    onEditProfileButtonTap: function(){
        this.fireEvent("editProfileCommand", this);
    }
});