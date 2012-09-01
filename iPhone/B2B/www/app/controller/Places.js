Ext.define("B2B.controller.Places", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			mapContainer: "drinkaroundmepanel",
			placeDetail: "placedetailpanel",
			appContainer: "App_Container",
			placeBeerList: "placebeerlist",
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
				submitCheckInCommand: "submitCheckIn",
				searchNewBeerCommand: "searchNewBeer"
			},
			placelistcomponent: {
				itemtap: "onViewPlaceDetail"
			},
			placeBeerList: {
				itemtap: "selectBeerInPlace"
			}
		}
	},
	submitCheckIn: function() {
		HH.log("Check in!");
		this.getApp().pop();
	},
	selectBeerInPlace: function(source, index, item, e, evObj) {
		setTimeout(function(){source.deselect(index);},500);
		var container = Ext.getCmp("containerbeerselected"),
			beerSelected = Ext.getCmp("beerSelectedContent");

		beerSelected.setHtml("<div class='beer-selected'>"+
			"<img class='beer-selected-image' src='resources/img/default/blank_avatar_64.png' width='64' height='64' />"+
				"<div class='small-list-text'>"+_.titleize(e.data.name)+"</div>"+
            	"<div class='small-list-subtext'>"+utils.getBeerStyleFromCode(parseInt(e.data.beerstyle))+"</div>"+
            "</div>"+
            "<div class='search-new-beer'><div class='search-new-beer-text'>"+i18n.app.CHANGE_BEER+"</div><div class='search-new-beer-logo'></div></div>");

		container.setActiveItem(1);
	},
	searchNewBeer: function() {
		var container = Ext.getCmp("containerbeerselected");
		container.setActiveItem(0);
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



