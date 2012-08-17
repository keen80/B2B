Ext.define("B2B.store.Activities", {
    extend: "Ext.data.Store",
    id: "Activities",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'ajax',
            url:'mock_activitylist.json',
            reader: {
                type:'json',
                rootProperty: 'response.body.activities',
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
                //console.log(records);
            }
        }
    }
    
});
