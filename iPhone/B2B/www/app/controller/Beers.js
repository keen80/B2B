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
		/* List Selection Deactivation */
		setTimeout(function(){a.deselect(b);},500);
		/* Since we used a subset list for list binding, on Beer Details we have to get
			the original value, we cannot use the index, which change upon filtering */
		var ajax_store = Ext.getStore('Beers_Ajax');
		//var jsonData = ajax_store.getAt(ajax_store.findExact("name", record.data.name));
		this.getApp().push({
			xtype: "beerdetailpanel",
			//jsonData: jsonData
			jsonData: record
		});

	},
	onBackBeerDetail: function(){
		this.getApp().pop();
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
							console.log(a.jsonData);
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