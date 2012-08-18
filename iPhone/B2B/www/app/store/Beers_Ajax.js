Ext.define("B2B.store.Beers_Ajax", {
    extend: "Ext.data.Store",
    id: "Beers_Ajax",
    config: {
        model: "B2B.model.Beer",
        /*  sorters: 'name',
      grouper: function(record){
            return (record.get('name')[0]).toUpperCase();
        },*/
        proxy: {
            type:'ajax',
            url:'mock_beerlist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.beers',
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
