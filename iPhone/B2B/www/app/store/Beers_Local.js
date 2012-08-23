/*
    NOT LOADED FOR PERFORMANCE REASON
*/

Ext.define("B2B.store.Beers_Local", {
    extend: "Ext.data.Store",
    id: "Beers_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoload: true,
        autosync: true,
        model: "B2B.model.Beer",
        sorters: 'name',
        grouper: function(record){
            return (record.get('name')[0]).toUpperCase();
        },
        proxy: {
            type:'localstorage',
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
               // console.log("Beers_Local: Store Loaded");
            }
        }
    }
    
});
