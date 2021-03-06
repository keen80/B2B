Ext.define("B2B.controller.Drinks", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			drinkListContainer: "drinklistcontainerpanel",
			drinkList: "drinkincheckinlistcomponent",
			app: "_app"
		},
		control: {
			profile: {
   			drinkListProfileCommand: "onShowDrinkList"
   		},
   		drinkListContainer: {
				backToProfileCommand: "popCurrentView"
			}
		}
	},
	init: function(){
		this.callParent(arguments);
	},
	popCurrentView: function() {
		var appcontainer = this.getApp();
		appcontainer.remove(Ext.getCmp('drinklistcontainerpanel'));
	},
	onShowDrinkList: function() {
		var drinklistcontainerpanel = {
			xtype: 'drinklistcontainerpanel',
			id: 'drinklistcontainerpanel'
		};

		var appcontainer = this.getApp();
		appcontainer.add(drinklistcontainerpanel);
		appcontainer.setActiveItem(2);
	}
});