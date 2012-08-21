Ext.define("B2B.controller.Beers", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			beerSearchComponent: "beerlistsearchcomponent",
			beerList: "beerlistcontainerpanel",
			beerForm: "beeraddform",
			beerDetail: "beerdetailpanel",
			beerlistcomponent: "beerlistcomponent",
			spinner: 'tbarspinner',
			app: "_app"
		},
		control:{
			beerSearchComponent: {
				beerAddCommand:	"onShowBeerForm"
			},
			beerForm: {
				beerSaveCommand: "onSaveBeer",
				beerBackCommand: "onBackBeer"
			},
			beerDetail: {
				reportBeerCommand: "onReportBeer",
				beerEditCommand: "onEditBeer",
				backBeerDetailCommand: "onBackBeerDetail"
			},
			beerList: {
				viewBeerDetailCommand: "onViewBeerDetail"
			},
			beerlistcomponent: {
				itemtap: "onViewBeerDetail"
			}
		}
	},
	onShowBeerForm: function(){

		var newBeer = Ext.create("B2B.model.Beer", {
		//	'idUser': B2B.app.loggedUser.idUser,
		//	'username': B2B.app.loggedUser.username,
		});

		this.getApp().push({
			xtype: "beeraddform"
		});
		var beerForm = this.getBeerForm();
		beerForm.setRecord(newBeer);
	},
	onEditBeer: function(){
		// TODO
		Ext.Msg.alert('Event EditBeer Received');
	},
	onSaveBeer: function(){
		var spinner = this.getSpinner();
		if(spinner.isHidden()) spinner.show();

		Ext.Msg.alert("Saved!");
		this.getBeerForm().reset();
		this.getApp().pop();

		if(!spinner.isHidden()) spinner.hide();
	},
	onBackBeer: function(){
		this.getBeerForm().reset();
		this.getApp().pop();
	},
	onViewBeerDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		var ajax_store = Ext.getStore('Beers_Ajax');
		var jsonData = ajax_store.getAt(ajax_store.findExact("name", record.data.name));
		this.getApp().push({
			xtype: "beerdetailpanel",
			jsonData: jsonData
		});

	},
	onBackBeerDetail: function(){
		this.getApp().pop();
	},
	/* Not Yet Implemented */
	onDeleteBeer: function(){
		Ext.Msg.alert('DeleteBeer Not Implemented');
	},
	onReportBeer: function(){
		Ext.Msg.alert('onAddReportBeer Not Implemented');
	},
	launch: function(){
		this.callParent(arguments);
		// Load Store
	},
	init: function(){
		this.callParent(arguments);
	}
});