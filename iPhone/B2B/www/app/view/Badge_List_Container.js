Ext.define('B2B.view.Badge_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'badgelistcontainerpanel',
	id: 'badgelistcontainerpanel',
	config: {
		title: i18n.app.LABEL_BADGES,
		iconCls: 'badge_list',
		layout: {
			type: 'fit'
		}
	},
	initialize: function() {
		this.callParent(arguments);
		 var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Badges_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR Badges "+user.idUser);
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
			title: i18n.app.LABEL_BADGES,
			id: 'BadgesContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		badgeList = {
			xtype: "badgelistcomponent",
			id: 'badgelist',
			store: Ext.getStore("Badges_Ajax"),
			ui: 'round'
		};

		this.add([toolbar, badgeList]);
	},
	onBackButtonTap: function() {
		this.fireEvent("backToProfileCommand", this);
	}
});