Ext.define("B2B.store.Profile_Local", {
    extend: "Ext.data.Store",
    id:"Profile_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.User",
        proxy:{
            type:'localstorage'
        },
        listeners: {
            exception:function(proxy, response, orientation){
                    console.error('Failure Notification', response.responseText);
                    Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Profile Store Callback");
            },
            load:function(el,records, successful){

            }
            
        }
    },

});
