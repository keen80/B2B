/* What's that store? We use it to bind the beerlist with a small subset of data
instead of the full json, hopefully something will be more responsive */

Ext.define("B2B.store.Beers_Single_Ajax", {
    extend: "Ext.data.Store",
    id: "Beers_Ajax",
    config: {
        model: "B2B.model.BeerSingle",
        proxy: {
            // Mock for Development
            type:'ajax',
            url:'mock_beerlist.json',
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
        autosync: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Beers Store Callback");
            },
            load:function(el,records, successful){ 
                HH.log("* Loaded: Store.Beer_Single_Ajax");

            }
        }
    }
    
});
