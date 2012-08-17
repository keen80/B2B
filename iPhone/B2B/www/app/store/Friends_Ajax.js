Ext.define("B2B.store.Friends_Ajax", {
    extend: "Ext.data.Store",
    id: "Friends_Ajax",
    config: {
        model: "B2B.model.Friend",
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

            }
        }
    }
    
});
