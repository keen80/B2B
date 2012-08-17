Ext.define("B2B.controller.Beers", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			beerSearchComponent: "beerlistsearchcomponent",
			beerList: "beerlistcontainerpanel",
			beerForm: "beeraddform",
			beerDetail: "beerdetailpanel",
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
				addReportBeerCommand: "onAddReportBeer",
				beerEditCommand: "onEditBeer"
			}
		}
	},
	onShowBeerForm: function(){

		var newBeer = Ext.create("B2B.model.Beer", {
			'idUser': B2B.app.loggedUser.idUser,
			'username': B2B.app.loggedUser.username,
			'name': "",
			'brewery': "TestBrewery",
			'nationality': "AZ",
			'type': 2,
			'beerstyle': 2,
			'grad': 2,
			'image': "",
			'param1': 2
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
	/* Not Yet Implemented */
	onDeleteBeer: function(){
		Ext.Msg.alert('DeleteBeer Not Implemented');
	},
	onAddReportBeer: function(){
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