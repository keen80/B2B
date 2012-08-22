Ext.define("B2B.store.Notifications_Ajax", {
    extend: "Ext.data.Store",
    id: "Notifications_Ajax",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Notification",
        proxy: {
            type:'ajax',
            url:'mock_notificationlist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.notifications',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            },
            extraParams:{
                username: 'test'
            }
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
               // console.log("Notifications_Ajax: Retrieved Data, copying to Local");
                var store_local = Ext.getStore('Notifications_Local');

                /* Copying to localstorage */
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
