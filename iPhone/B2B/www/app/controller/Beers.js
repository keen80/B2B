Ext.define("B2B.controller.Beers", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			beerSearchComponent: "beersearch",
			beerSelectContainer: "beerlistselectcontainerpanel",
			beerSelectSearchComponent: "beerlistselectsearchcomponent",
			beerList: "beer",
			beerForm: "beeraddform",
			beerDetail: "beerdetailpanel",
			beerlist: "beerlist",
			beerlistselectcomponent: "beerlistselect",
			beerlistselectcomponent: "beerlistselectcomponent",
			spinner: 'tbarspinner',
			app: "_app"
		},
		control:{
			beerSearchComponent: {
				beerAddCommand:	"onShowBeerForm"
			},
			beerSelectSearchComponent: {
				beerAddCommand:	"onShowBeerForm"
			},
			beerForm: {
				beerSaveCommand: "onSaveBeer",
				beerBackCommand: "onBackBeer"
			},
			beerDetail: {
				reportBeerCommand: "onReportBeer",
				beerEditCommand: "onEditBeer",
				backBeerDetailCommand: "onBackBeerDetail",
				addFavoriteBeerCommand: "onAddFavoriteBeer"
			},
			beerList: {
				viewBeerDetailCommand: "onViewBeerDetail"
			},
			beerlist: {
				itemtap: "onViewBeerDetail"
			},
			beerlistselectcomponent: {
				itemtap: "onSelectBeer"
			},
			beerSelectContainer:{
				backBeerSelectCommand: "onBackBeerSelect"
			}
		}
	},
	onShowBeerForm: function(){
/*
		var newBeer = Ext.create("B2B.model.Beer", {
		//	'idUser': B2B.app.loggedUser.idUser,
		//	'username': B2B.app.loggedUser.username,
		});

		this.getApp().push({
			xtype: "beeraddform",
			id: 'beeraddform'
		});
		var beerForm = this.getBeerForm();
		beerForm.setRecord(newBeer);
*/
		var beeraddform = {
			xtype: "beeraddform",
			id: 'beeraddform'
		};

		var app = Ext.getCmp('_app');
		app.add(beeraddform);
		app.setActiveItem(2);

		//beeraddform.setRecord(newBeer);
	},
	onSaveBeer: function(){
		var spinner = this.getSpinner();
		if(spinner.isHidden()) spinner.show();
		var beerForm = this.getBeerForm();

		beerForm.submit({
			url: HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/insertBeer',
			method: 'POST',
			successProperty: 'response.status.success',
			success: function() {
				alert('form submitted successfully!');
				if(!spinner.isHidden()) spinner.hide();
				var app = this.getApp();
				var beeraddform = Ext.getCmp('beeraddform');
				beeraddform.reset();
				app.remove(beeraddform);
			},
			failure: function(form, action) {
				alert("PUPPA");
				if(!spinner.isHidden()) spinner.hide();
				var app = Ext.getCmp('_app');
				var beeraddform = Ext.getCmp('beeraddform');
				beeraddform.reset();
				app.remove(beeraddform);
			}
		});
	},
	onBackBeer: function(){
		var app = this.getApp();
		var beeraddform = Ext.getCmp('beeraddform');
		beeraddform.reset();
		app.remove(beeraddform);
		//this.getBeerForm().reset();
		//this.getApp().pop();
	},
	onBackBeerSelect: function(){
		this.getApp().pop();
	},
	onViewBeerDetail: function(a, b, c, record){
		/* List Selection Deactivation */
		setTimeout(function(){a.deselect(b);},500);
		/* Since we used a subset list for list binding, on Beer Details we have to get
			the original value, we cannot use the index, which change upon filtering */
		var ajax_store = Ext.getStore('Beers_Ajax');
		//var jsonData = ajax_store.getAt(ajax_store.findExact("name", record.data.name));
		this.getApp().push({
			xtype: "beerdetailpanel",
			jsonData: record
		});

	},
	onBackBeerDetail: function(){
		this.getApp().pop();
	},
	onAddFavoriteBeer: function(a, beer){
		var newFavorite = Ext.create("B2B.model.FavoriteBeer", {
			'idBeer': beer.idBeer,
			'beerName': beer.name
		});
		var store = Ext.getStore('FavoriteBeers_Local');
		store.add(newFavorite);
		//store.sync()
		HH.log("-- Added Beer " + beer.name+" to store (now "+store.getCount()+" items)");
	},
	onSelectBeer: function(){

	},
	/* Not Yet Implemented */
	onEditBeer: function(){
		Ext.Msg.alert('TODO: Event EditBeer Received, Next release');
	},
	onDeleteBeer: function(){
		Ext.Msg.alert('TODO: DeleteBeer Not Implemented');
	},
	onReportBeer: function(a){
		if (!a.actions){
			a.actions = Ext.Viewport.add({
				xtype: 'actionsheet',
				items: [
					{
						text: i18n.app.BTN_BEERREPORTXL,
						scope: this,
						ui: 'decline',
						handler: function(){
							alert(i18n.app.DIALOG_BEERREPORTED)
							a.actions.hide();
						}
					},
					{
						text: i18n.app.BTN_BEERSUGGESTEDIT,
						scope: this,
						handler: function(){
							HH.log(a.jsonData);
							a.actions.hide();
							var newBeer = Ext.create("B2B.model.Beer", {
							//	'idUser': B2B.app.loggedUser.idUser,
							//	'username': B2B.app.loggedUser.username,
							});

							this.getApp().push({
								xtype: "beeraddform"
							});
							var beerForm = this.getBeerForm();
							beerForm.setRecord(newBeer);
						}
					},
					{
						text: i18n.app.BTN_CANCEL,
						scope: this,
						handler: function(){
							a.actions.hide();
						}
					}
				]
			});
		}
		a.actions.show();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});