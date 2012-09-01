Ext.define("B2B.controller.Favorites", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			profilePanel: "userprofile",
			favoritesPanel: "favoritespanel"
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
		this.getApp().push({
			xtype: "favoritespanel"
		});
	},
	onFavoritesBack: function(){
		this.getApp().pop();
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


