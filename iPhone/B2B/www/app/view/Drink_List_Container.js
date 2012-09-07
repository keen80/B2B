Ext.define('B2B.view.Drink_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'drinklistcontainerpanel',
	id: 'drinklistcontainerpanel',
	config: {
		title: i18n.app.LABEL_DRINKS,
		iconCls: 'drink_list',
		layout: {
			type: 'fit'
		}
	},
	initialize: function() {
		this.callParent(arguments);
		var storeProfile = Ext.getStore("Profile_Local");
        var storeJSONP=Ext.getStore('Drinks_Ajax');
        var user=storeProfile.first().data;
        HH.log("LOAD PROFILE FOR Drinks "+user.idUser);
        storeJSONP.getProxy().setExtraParam('idUser', user.idUser);
        storeJSONP.getProxy().setExtraParam('btUsername',user.idUser);
        storeJSONP.getProxy().setExtraParam('btSid','puppa');//user.token
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
			title: i18n.app.LABEL_DRINK,
			id: 'DrinksContainerTitlebar',
			defaults: {
				iconMask: true
			},
			items: [
				backButton,
				{ xtype: 'spacer' }
			]
		},
		drinkList = {
			xtype: "drinkincheckinlistcomponent",
			id: 'drinklist',
			store: Ext.getStore("Drinks_Local")
			//ui: 'round'
		};

		this.add([toolbar, drinkList]);
	},
	onBackButtonTap: function() {
		this.fireEvent("backToProfileCommand", this);
	}
});