Ext.define("B2B.controller._Login", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			_Login: "#BTN_login",
			_App: "_app"
		},
		control: {
			_Login:{
				loginCommand: "onLoginCommand"
			}
		}
	},
	onLoginCommand: function(){

		/*
			Check Auth via AJAX

		*/
	  	
		var username = Ext.getCmp('loginform_username').getValue();
		var password = Ext.getCmp('loginform_password').getValue();
		
		Ext.Ajax.request({
        //url: "http://192.168.1.161:8080/birrettaservice/rest/bserv/login",
        url: "http://localhost:8081/birrettaservice/rest/bserv/login",
        method: "POST",
        defaultHeaders: {
                            'Content-Type': 'application/json; charset=iso-8859-1'
                        },
      //  scriptTag: true,
        params: {
           username: username, 
           password: password
        },
        timeout: 10000,

        success: function(result) {
            console.log(result);
        },

        failure: function(){
            Ext.Msg.alert("Could not connect to server.");
        }   
    });

		//Ext.getCmp("_login").submit();
		//return false;

	  	if (navigator.onLine){
                goingTo.step2("Profile_Local: Store Empty, Refresh Data via Ajax");

        }else{
                goingTo.step3("Profile_Local: Offline Mode");
        }
        /* TO DO AUTH */
        if(true){
        	Ext.Viewport.removeAll(true);
        	Ext.Viewport.add(Ext.create('B2B.view._App'));
        }

	},
	init: function(){
		this.callParent(arguments);
	}
});


