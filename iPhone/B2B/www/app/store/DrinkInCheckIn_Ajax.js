Ext.define("B2B.store.DrinkInCheckIn_Ajax", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.JsonP",
    id: "DrinkInCheckIn_Ajax",
    config: {
        model: "B2B.model.Drink",
        proxy: {
            // Mock for Development
            type:'ajax',
            url:'json/mock_drinkincheckinlist.json',
            // type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            // url: (HH.OFFLINE_MODE ? 'json/mock_drinkincheckinlist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listBeer_jsonp'),
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
        //autoLoad: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Beers Store Callback");
            },
            load:function(el,records, successful){
                HH.log("* Loaded: Store.DrinkinCheckIn_Ajax");


            }
        }
    }

});
