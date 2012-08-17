Ext.define("B2B.store.Profile_Ajax", {
    extend: "Ext.data.Store",
    id:"Profile_Ajax",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "B2B.model.User",
        proxy:{
            type:'ajax',
            url:'mock_user.json',
            reader:{
                type:'json',
                rootProperty: 'response.body.users',
                successProperty: 'response.status.success',
                totalProperty: 'response.status.count',
                messageProperty: 'response.status.msg'
            },
        },
        listeners: {
            exception:function(proxy, response, orientation){
                    console.error('Failure Notification', response.responseText);
                    Ext.Msg.alert('Loading failed', response.statusText);
            },
            callback: function(success,response){
                console.log("Profile Store Callback");
            },
            load:function(el,records, successful){
                var dataJSON  = el.first().data;
                var displayName = utils.getDisplayName(dataJSON);
                Ext.getCmp('AboutTitlebar').setTitle(displayName);
                Ext.getCmp('appslidercontainer').setTitle('<div class="nav_slidemenu_profile"><img src="'+dataJSON.avatar+'" class="smallavatar"><span>'+displayName+'</span>');
                
                var preferencesForm = Ext.getCmp("userpreferencesform");
                preferencesForm.reset();
                preferencesForm.setRecord(el.first());

                B2B.app.getController('Preferences').onChangeTwitter(null, dataJSON.shareTwitter);
                B2B.app.getController('Preferences').onChangeFacebook(null, dataJSON.shareFacebook);
            }
            
        }
    },

});
