Ext.define("B2B.store.Friends_Ajax", {
    extend: "Ext.data.Store",
    id: "Friends_Ajax",
    config: {
        model: "B2B.model.Friend",
        sorters: 'displayName',
      /*  grouper: function(record){
            return (record.get('displayName')[0]).toUpperCase();
        }, */
        proxy: {
            type:'ajax',
            url:'mock_friendlist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.users',
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
                console.log("Friends_Ajax: Retrieved Data, copying to Local");
                var store_local = Ext.getStore('Friends_Local');

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
