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
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Friends Store Callback");
            },
            load:function(el,records, successful){
              HH.log("* Loaded: Store.Notification_Local");
            }
        }
    }

});
