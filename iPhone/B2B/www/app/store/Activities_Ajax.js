Ext.define("B2B.store.Activities_Ajax", {
    extend: "Ext.data.Store",
    id: "Activities_Ajax",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'ajax',
            url:'mock_activitylist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            },
            extraParams:{
                username:'test'
            }
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities Store Callback");
            },
            load:function(el,records, successful){
                HH.log("* Loaded: Activities_Ajax, copying to Local");
                var store_local = Ext.getStore('Activities_Local');

                /* Copying to Localstorage */
                store_local.removeAll();
                store_local.getProxy().clear();
                this.each(function(record) {
                    store_local.add(record.data);
                });
                store_local.sync();
                this.removeAll();
            }
        }
    }
    
});
