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
            load:function(el,records, successful){
                console.log("Profile_Local: Loading profile from LS...");
                if (navigator.onLine){
                    goingTo.step2("Profile_Local: Store Empty, Refresh Data via Ajax");
                }else{
                    goingTo.step3("Profile_Local: Offline Mode, Should never happen");
                }
                
            }
            
        }
    },

});
