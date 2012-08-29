Ext.define("B2B.store.FavoriteBeers_Local", {
	extend: "Ext.data.Store",
	id:"FavoriteBeers_Local",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		autoLoad: true,
		autoSync: true,
		model: "B2B.model.FavoriteBeer",
		proxy:{
			type:'localstorage'
		},
		listeners: {
			exception:function(proxy, response, orientation){
					console.error('Failure Notification', response.responseText);
					Ext.Msg.alert('Loading failed', response.statusText);
			},
			load:function(el,records, successful){
				HH.log("* Loaded: Store.FavoriteBeers_Local");
			}
		}
	}
});
