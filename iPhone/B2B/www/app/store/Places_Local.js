Ext.define("B2B.store.Places_Local", {
    extend: "Ext.data.Store",
    id:"Places_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Place",
        proxy:{
            type:'localstorage'
        },
        listeners: {
            exception:function(proxy, response, orientation){
                    console.error('Failure Notification', response.responseText);
                    Ext.Msg.alert('Loading failed', response.statusText);
            },
            load:function(el,records, successful){
                console.log("Places_Local: Loading profile from LS...");
                
            }
            
        }
    },

});
