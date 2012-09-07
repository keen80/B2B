Ext.define("B2B.store.Activities_User_Ajax", {
    extend: "Ext.data.Store",
    id: "Activities_User_Ajax",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type: (HH.OFFLINE_MODE ? 'ajax' : 'jsonp'),
            url: (HH.OFFLINE_MODE ? 'json/mock_activityuser.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/listMyActivity_jsonp'),
            reader: {
                type:'json',
                rootProperty: 'response.body.list',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            }/*,
            extraParams:{
                username:'test'
            }*/
        },
        listeners:{
            exception:function(proxy, response, orientation){
                console.error('Failure Notification', response.responseText);
                utils.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities User Store Callback");
            },
            load: function(el,records, successful){
                  HH.log("* Loaded: Activities_User_Ajax, copying to Local");
                var store_local = Ext.getStore('Activities_User_Local');

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
