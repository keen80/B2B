Ext.define("B2B.store.Profile_Ajax", {
    extend: "Ext.data.Store",
    id:"Profile_Ajax",
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
        autoload: false,
        listeners: {
            exception:function(proxy, response, orientation){
                    console.error('Failure Notification', response.responseText);
                    goingTo.step3("Nevermind We will use the LS");
            },
            load: function(el,records, successful){
                console.log("Profile_Ajax: Retrieved Data, copying to Local");
                var store_local = Ext.getStore('Profile_Local');
                var toBeer = false;
                var toFriend = false;
                var toNotify = false;

                /* has something changed? */
                if(store_local.getCount > 0){
                    localJSON  = store_local.first().data;
                    remoteJSON = el.first().data;
                    
                    toBeer = (localJSON.hash_beerlist != remoteJSON.hash_beerlist);
                    toFriend = (localJSON.hash_friendlist != remoteJSON.hash_friendlist);
                    toNotify = (localJSON.hash_notificationlist != remoteJSON.hash_notificationlist);
                }

                store_local.getProxy().clear();
                this.each(function(record) {
                    store_local.add(record.data);
                });
                store_local.sync();
                this.removeAll();
                
                goingTo.step3("Profile_Ajax: Load App Defaults from LS", toBeer, toFriend, toNotify);
            }
            
        }
    },

});
