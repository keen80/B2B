Ext.define("B2B.store.Notifications_Local", {
    extend: "Ext.data.Store",
    id: "Notifications_Local",
    config: {
        model: "B2B.model.Notification",
        proxy: {
            type:'localstorage'
        },
        autoload: true,
        autosync: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Friends Store Callback");
            },
            load:function(el,records, successful){ 
                console.log("Notifications_Local: Store Loaded");
            }
        }
    }
    
});
