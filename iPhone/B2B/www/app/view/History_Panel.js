Ext.define('B2B.view.History_Panel', {
	extend: 'Ext.Panel',
	xtype: 'historypanel',
    id: 'historypanel',
	config: {
		title: i18n.app.PANEL_HISTORY,
		iconCls: 'home2',
		styleHtmlContent: true,
		layout: {
        	type: 'fit'
        }
	},
	initialize: function() {
        this.callParent(arguments);
         var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Activities_User_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR Activity "+user.idUser);
        storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
        storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
        storeJSONP.getProxy().setExtraParam('btSid', user.token);//user.token
        storeJSONP.load();
       var backButton = {
            text: i18n.app.BTN_BACK,
            ui: 'back',
            id: 'back_about_btn',
            handler: this.onBackButtonTap,
            scope: this
        },
        toolbar = {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'sub_titlebar',
            title: i18n.app.PANEL_HISTORY,
            id: 'DrinksContainerTitlebar',
            defaults: {
                iconMask: true
            },
            items: [
                backButton,
                { xtype: 'spacer' }
            ]
        },
            activitylist = {
                xtype: "activitylist",
                id: 'activitylist',
                store: Ext.getStore("Activities_User_Local"),
            };


		this.add([ toolbar, activitylist ]);
    },
    onBackButtonTap: function() {
        this.fireEvent("backToProfileCommand", this);
    }
});