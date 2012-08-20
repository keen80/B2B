Ext.define("B2B.store.Friends_Local", {
    extend: "Ext.data.Store",
    id: "Friends_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Friend",
        sorters: 'displayName',
        grouper: function(record){
            return (record.get('displayName')[0]).toUpperCase();
        },
        proxy: {
            type:'localstorage'
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Friends Store Callback");
            },
            load:function(el,records, successful){ 
                console.log("Friends_Local: Store Loaded");
            }
        }
    }
    
});