Ext.define("B2B.controller.Places", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			mapContainer: "drinkaroundmepanel",
			placeDetail: "placedetailpanel",
			appContainer: "App_Container",
			app: "_app"
		},
		control: {
			mapContainer: {
				reloadCommand: "onReloadCommand"
			},
			placeDetail: {
				backPlaceDetailCommand: "onBackPlace",
				selectBeerDrinkCommand: "onSelectBeerDrink",
				onDrinkInCommand: "onDrinkIn",
				submitCheckInCommand: "submitCheckIn"
			},
			placelistcomponent: {
				itemtap: "onViewPlaceDetail"
			}
		}
	},
	submitCheckIn: function() {
		console.log("Check in!");
	},
	onReloadCommand: function(){
		/* TODO: HOW THE HELL WE REFRESH THE REVIEW? */
		HH.log("TODO: Map Reload Mock");
	},
	onBackPlace: function(){
		this.getApp().pop();
	},
	onViewPlaceDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		var jsonData = record.data;
		this.getApp().push({
			xtype: "placedetailpanel",
			jsonData: jsonData
		});
	},
	onSelectBeerDrink: function(){
		this.getApp().push({
			xtype: "beerlistselectcontainerpanel",
		});
	},
	onDrinkIn: function(){
		this.getApp().pop();
	},
	init: function(){
		this.callParent(arguments);
	}
});



