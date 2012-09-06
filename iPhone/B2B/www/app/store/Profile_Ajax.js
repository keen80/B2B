Ext.define("B2B.store.Profile_Ajax", {
	extend: "Ext.data.Store",
	id:"Profile_Ajax",
	config: {
		model: "B2B.model.User",
		proxy:{
			url: (HH.LOAD_PROFILE_MOCK ? 'json/mock_user.json' : HH.IP_PORT_SERVER + '/birrettaservice/rest/bserv/detailsUserByUsername_jsonp'),
           	type: (HH.LOAD_PROFILE_MOCK ? 'ajax' : 'jsonp'),
			reader:{
				type:'json',
				rootProperty: 'response.body.list',
				successProperty: 'response.status.success',
				totalProperty: 'response.status.count',
				messageProperty: 'response.status.msg'
			}
		},
		autoload: false,
		listeners: {
			exception:function(proxy, response, orientation){
				console.error('Failure Notification', response.responseText);
				goingTo.step4("Nevermind We will use the LS");
			},
			load: function(el,records, successful){
				HH.log("* Loaded: Store.Profile_Ajax, copying to Local");

				var store_local = Ext.getStore('Profile_Local'),
					toBeer = false,
					toFriend = false,
					toNotify = false,
					token = "";

				/* has something changed? Then we flag to load the whole resxs */
				if(store_local.getCount() > 0 && el.getCount() > 0){
					localJSON  = store_local.first().data;
					remoteJSON = el.first().data;
					token = localJSON.token;
					HH.log("---> Step: Calculating if other Stores need refresh");
					toBeer = (localJSON.hash_beerlist !== remoteJSON.hash_beerlist);
					toFriend = (localJSON.hash_friendlist !== remoteJSON.hash_friendlist);
					toNotify = (localJSON.hash_notificationlist !== remoteJSON.hash_notificationlist);
				}

				/* We copy from memory to localstorage */
				store_local.removeAll();
				store_local.getProxy().clear();
				this.each(function(record) {
					store_local.add(record.data);
				});

				if (store_local.getCount() > 0) {
					store_local.first().set("token", token);
				}

				store_local.sync();
				this.removeAll();

				/* see resources/js/hh */
				goingTo.step3("Load: Activities", toBeer, toFriend, toNotify);
			}
		}
	},
});
