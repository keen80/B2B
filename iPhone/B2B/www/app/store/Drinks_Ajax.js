Ext.define("B2B.store.Drinks_Ajax", {
<<<<<<< HEAD
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.JsonP",
    id: "Drinks_Ajax",
    config: {
        model: "B2B.model.Drink",
        proxy: {
            // Mock for Development 
            type:'ajax',
            url:'mock_drinklist.json',
            //type:'jsonp',
            //url:'http://192.168.1.161:8080/birrettaservice/rest/bserv/listBeer_jsonp',
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
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Beers Store Callback");
            },
            load:function(el,records, successful){ 
                HH.log("* Loaded: Store.Drinks_Ajax, copying to Local");
                var store_local = Ext.getStore('Drinks_Local');
                var image = HH.default_user48;
                var userdata = el.first();

                Ext.getCmp("lastdrink").setHtml(
                    [
                    '<div class="lastdrink">',
                    '<img class="avatar_medium" src="'+image+'" width="48" height="48" >',
                    '<div class="small-list-when"> 2 min fa</div>',
                    '<div class="medium-list-text">Your lastest drink was a <strong>'+userdata.data.beerName+'</strong>, at <strong>'+userdata.data.placeName+'</strong></div>',
                    '</div>'
                    ].join("")
                );
=======
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.JsonP",
	id: "Drinks_Ajax",
	config: {
		model: "B2B.model.Drink",
		proxy: {
			// Mock for Development
			type:'ajax',
			url:'mock_drinklist.json',
			//type:'jsonp',
			//url:'http://192.168.1.161:8080/birrettaservice/rest/bserv/listBeer_jsonp',
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
				console.error('Failure Notification', response.responseText);
				Ext.Msg.alert('Loading failed', response.statusText);
			},
			callback: function(success,response){
				console.log("Beers Store Callback");
			},
			load:function(el, records, successful){
				HH.log("* Loaded: Store.Drinks_Ajax, copying to Local");
				var store_local = Ext.getStore('Drinks_Local'),
					image = HH.default_user48,
					userdata = el.first(),
					beerName = userdata.data.beerName,
					placeName = userdata.data.placeName;

				beerName = (beerName !== null ? beerName : "");
				placeName = (placeName !== null ? placeName : "");
>>>>>>> Cambiati i default.png e le icone. Cambiato stile dei bottoni in about.

				Ext.getCmp("lastdrink").setHtml(
					[
					'<div class="lastdrink">',
						'<img class="avatar_medium" src="' + image + '" width="48" height="48" />',
						'<div class="small-list-when"> 2 min fa</div>',
						'<div class="medium-list-text">Your lastest drink was a ' + beerName,
						', at ' + placeName + '</div>',
					'</div>'
					].join("")
				);

				/* Copying to localstorage */
				store_local.removeAll();
				store_local.getProxy().clear();
				this.each(function(record) {
					store_local.add(record.data);
				});
				store_local.sync();
				this.removeAll();
			}
		}
	}

});
