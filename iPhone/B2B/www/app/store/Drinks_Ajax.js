Ext.define("B2B.store.Drinks_Ajax", {
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
                rootProperty: 'response.body.drinks',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
       // autoLoad: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Beers Store Callback");
            },
            load:function(el,records, successful){ 
            /*  
                HH for performance reason we don't copy into localstorage
                console.log("Beers_Ajax: Retrieved Data, copying to Local");
                var store_local = Ext.getStore('Beers_Local');

                store_local.getProxy().clear();
                this.each(function(record) {
                    store_local.add(record.data);
                });
                store_local.sync();
                this.removeAll();
            */  

            }
        }
    }
    
});