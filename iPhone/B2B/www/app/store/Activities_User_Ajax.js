Ext.define("B2B.store.Activities_User_Ajax", {
    extend: "Ext.data.Store",
    id: "Activities_User_Ajax",
    config: {
        model: "B2B.model.Activity",
        proxy: {
           // type:'ajax',
           // url:'json/mock_activityuser.json',
            type:'jsonp',
            url:HH.IP_PORT_SERVER+'/birrettaservice/rest/bserv/listMyActivity_jsonp',
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
                Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Activities Store Callback");
            },
            load: function(el,records, successful){
                HH.log("* Loaded: Activities_User_Ajax");
 
            }
        }
    }
    
});
