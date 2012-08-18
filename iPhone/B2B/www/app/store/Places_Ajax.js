Ext.define("B2B.store.Places_Ajax", {
    extend: "Ext.data.Store",
    id: "Places_Ajax",
    config: {
        model: "B2B.model.Place",
        proxy: {
            type:'ajax',
            url:'mock_placelist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.places',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Beers Store Callback");
            },
            load:function(el,records, successful){ 
                console.log(records);
              /*  console.log("Beers_Ajax: Retrieved Data, copying to Local");
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
