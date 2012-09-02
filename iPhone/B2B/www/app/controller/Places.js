Ext.define("B2B.controller.Places", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			place: "place",
			placelist: "placelist",
			placedetail: "placedetail",
			placebeerlist: "placebeerlist",
			appContainer: "appcontainer",
			app: "_app"
		},
		control: {
			place: {
				checkInDetailCommand: "onCheckInDetail",
				refreshAroundCommand: "onCheckInRefreshAround",
				backCheckCommand: "onBackCheck"
			},
			placelist: {
				itemtap: "onViewPlaceDetail"
			},
			placedetail: {
				backPlaceDetailCommand: "onBackPlace",
				selectBeerDrinkCommand: "onSelectBeerDrink",
				checkInCommand: "onCheckIn",
				searchNewBeerCommand: "searchNewBeer"
			},
			placebeerlist: {
				itemtap: "selectBeerInPlace"
			},
			appContainer: {
				gotoCheckInCommand: "onGotoCheckIn"
			}
		}
	},
	onGotoCheckIn: function(){
		this.getApp().push({
			xtype: "place",
			id: "place"
		});
	},
	onBackCheck: function(){
		this.getApp().pop();
	},
	onBackPlace: function(){
		this.getApp().pop();
	},
	onCheckInRefreshAround: function(){
		alert("ToDO: To Be Implemented");
	},
	onShow: function(){
		console.log("TODO: Refresh on Show");

		/* function(list, opts){
        this.getStore().load();*/
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
	onViewPlaceDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		var jsonData = record.data;
		this.getApp().push({
			xtype: "placedetail",
			jsonData: jsonData
		});
	},
	onSelectBeerDrink: function(){
		this.getApp().push({
			xtype: "beerlistselectcontainerpanel",
			id: "beerlistselectcontainerpanel"
		});
	},
	onCheckIn: function(){
		this.getApp().pop();
	},
	init: function(){
		this.callParent(arguments);
	}
});



