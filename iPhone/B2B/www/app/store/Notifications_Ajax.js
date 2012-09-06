Ext.define("B2B.store.Notifications_Ajax", {
    extend: "Ext.data.Store",
    id: "Notifications_Ajax",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Notification",
        proxy: {
            //type:'ajax',
            //url:'json/mock_notificationlist.json',
            type:'jsonp',
            url:HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/listNotification_jsonp',
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
        autoload: true,
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Friends Store Callback");
            },
            load:function(el,records, successful){
                HH.log("* Loaded: Store.Notification_Ajax, copying to Local");
                var store_local = Ext.getStore('Notifications_Local');

                /* Copying to localstorage */
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
