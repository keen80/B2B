Ext.define("B2B.store.Badges_Ajax", {
	extend: "Ext.data.Store",
	id: "Badges_Ajax",
	config: {
		model: "B2B.model.Badge",
		proxy: {
			type:'ajax',
			url:'mock_badgelist.json',
			reader: {
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		autoLoad: true,
		listeners:{
			exception:function(proxy, response, orientation){
				console.error('Failure Badge', response.responseText);
				Ext.Msg.alert('Loading failed', response.statusText);
			},
			callback: function(success,response){
				HH.log("Badges Store Callback");
			},
			load:function(el,records, successful){
				HH.log("* Loaded: Store.Badges_Ajax");
			}
		}
	}
});
