Ext.define("B2B.store.Activities_Ajax", {
    extend: "Ext.data.Store",
    id: "Activities_Ajax",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type: (HH.LOAD_PROFILE_MOCK ? 'ajax' : 'jsonp'),
            url: (HH.LOAD_PROFILE_MOCK ? 'json/mock_activitylist.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listFriendActivity_jsonp'),
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
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
