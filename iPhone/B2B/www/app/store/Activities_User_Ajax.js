Ext.define("B2B.store.Activities_User_Ajax", {
    extend: "Ext.data.Store",
    id: "Activities_User_Ajax",
    config: {
        model: "B2B.model.Activity",
        proxy: {
            type:'ajax',
            url:'mock_activityuser.json',
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
                HH.log("* Loaded: Activities_User_Ajax, copying to Local");
                var jsonData = records.data;
                console.log(records);
                Ext.getCmp("lastdrink").setHtml(
                    [
                    '<div>',
                    '<img src="'+jsonData.image+'" width="64" height="64" >',
                    '<span class=".medium-list-text">Blah Blah Blah</span>',
                    '<span class="small-list-when"> 2 min fa</span>',
                    '</div>'
                    ].join("")
                );
                console.log(records);
            }
        }
    }
    
});
