Ext.define("B2B.controller._APP", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			_App: "_app",
		},
		control: {
			_App: {
				initialize: "onInitialize",
			}
		}
	},
	onInitialize: function(){
	
		
		/*Simuliamo il get

		var userProfile = Ext.create("B2B.model.User",
			{
	          "idUser": 1,
	          "username": "Admin",
	          "description": "descAdmin",
	          "email": "Admin@gmail.com",
	          "firstName": "NomeAdmin",
	          "lastName": "Cognome Admin",
	          "gender": 1,
	          "nationality": "IT",
	          "shareTwitter": true,
	          "shareFacebook": false,
	          "enableNotification": false,
	          "idUser": "50073asdsdsaddassd2",
	          "pwdHash": "e20d7722222240b23378133454f0bdae699f2f23e",
	          "role": 1,
	          "status": 1,
	          "badges": "",
	          "favorites": "",
	          "liked": "",
	          "counter_friends": 0,
	          "counter_checkIns": 0,
	          "counter_badges": 0
	        }
		);

		storeProfile.add(userProfile); */


	},
	onSyncProfileStore: function(){

	},
	init: function(){
		this.callParent(arguments);
	}
});


