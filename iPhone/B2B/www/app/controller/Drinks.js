Ext.define("B2B.controller.Drinks", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			profile: "userprofile",
			drinkListContainer: "drinklistcontainerpanel",
			drinkList: "drinkincheckinlistcomponent",
//			appContainer: "appcontainer",
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
		this.getApp().pop();
	},
	onShowDrinkList: function() {
		HH.log("arrivato qui");
		this.getApp().push({
			xtype: "drinklistcontainerpanel"
		});
	}
});