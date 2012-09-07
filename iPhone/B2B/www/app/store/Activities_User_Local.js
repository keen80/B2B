Ext.define("B2B.store.Activities_User_Local", {
    extend: "Ext.data.Store",
    id: "Activities_User_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'localstorage',
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities User Local Store Callback");
            },
            load:function(el,records, successful){
               HH.log("* Loaded: Store.Activity_User_Local");
            }
        }
    }

});