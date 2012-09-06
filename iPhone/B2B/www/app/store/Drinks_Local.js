Ext.define("B2B.store.Drinks_Local", {
    extend: "Ext.data.Store",
    id: "Drinks_Local",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoload: true,
        autosync: true,
        model: "B2B.model.Drink",
        proxy: {
            type:'localstorage',
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                HH.log("Beers Store Callback");
            },
            load:function(el,records, successful){

            }
        }
    }

});
