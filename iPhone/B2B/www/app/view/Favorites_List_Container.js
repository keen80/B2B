Ext.define('B2B.view.Favorites_List_Container', {
	extend: 'Ext.form.Panel',
	id: 'favoritespanel',
	xtype: 'favoritespanel',
	requires: [
		'Ext.Container',
		'Ext.MessageBox',
		'Ext.Panel',
		'Ext.Toolbar',
		'Ext.field.Select'
	],
	config: {
		title: i18n.app.PANEL_FAVORITESPANEL,
		iconCls: 'add',
		layout: 'vbox'
	},
	initialize: function(){
		this.callParent(arguments);

		var backFavoritesButton = {
			xtype: "button",
			text: i18n.app.BTN_BACK,
			ui: 'back',
			id: 'favorites_back_btn',
			handler: this.onFavoritesBackButtonTap,
			scope: this
		},
		jumptoBeerButton = {
			xtype: "button",
			text: i18n.app.BTN_ADDFAVORITE,
			ui: 'action',
			id: 'favorites_add_btn',
			handler: this.onFavoritesAddButtonTap,
			scope: this,
			docked: 'bottom'
		},
		toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				backFavoritesButton
			]
		},
		favoritesList = {
			xtype: "favoriteslistcomponent",
			store: Ext.getStore("FavoriteBeers_Local"),
			flex: 1
		},
		container = {
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'vbox'
			},
			items: [
				favoritesList,
				jumptoBeerButton
			]
		};

		this.add([toolbar, /*favoritesList,*/ container]);

	},
	onFavoritesBackButtonTap: function(){
		this.fireEvent("backFavoritesCommand", this);
	},
	onFavoritesAddButtonTap: function(){
		this.fireEvent("jumptoBeerCommand", this);
	}
});