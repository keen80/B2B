Ext.define("B2B.controller.Favorites", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			profilePanel: "userprofile",
			favoritesPanel: "favoritesbeer"
		},
		control: {
			app: {
				
			},
			profilePanel: {
				favoritesProfileCommand: "onFavoritesOpen"
			},
			favoritesPanel: {
				jumptoBeerCommand: "onJumpToBeer",
				backFavoritesCommand: "onFavoritesBack"
			},
		}
	},
	onFavoritesOpen: function(){
		var favoritesbeer = {
			xtype: "favoritesbeer",
			id: "favoritesbeer"
		};
		var appcontainer = Ext.getCmp('_app');
		appcontainer.add(favoritesbeer);
		appcontainer.setActiveItem(2);
	},
	onFavoritesBack: function(){
		var appcontainer = Ext.getCmp('_app');
		appcontainer.add(Ext.getCmp('favoritesbeer'));
	},
	onJumpToBeer: function(){
		this.getApp().pop();
		var tabPanel = Ext.Viewport.down("appcontainer");
		tabPanel.setActiveItem(1);
	},
	init: function(){
		this.callParent(arguments);
	}
});


