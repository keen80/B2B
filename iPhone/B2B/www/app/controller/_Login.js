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
		//TODO: Validation
		HH.log("XXX TODO: _Login Validation", true);

		Ext.Ajax.request({
        //url: "http://192.168.1.161:8080/birrettaservice/rest/bserv/login",
        url: "http://localhost:8081/birrettaservice/rest/bserv/login",
        method: "POST",
        defaultHeaders: {
              	'Content-Type': 'application/json; charset=iso-8859-1'
            },
        params: {
           username: username, 
           password: password
        },
        timeout: 10000,

        //success: function(result) {
        failure: function(result) {
            HH.log("---> Step: AUTH Success");
        	goingTo.step2("Loading Store.Profile_Ajax");
        	HH.log("---> Step: Clear app, loading _App");
        	Ext.Viewport.removeAll(true, true);
        	Ext.Viewport.add(Ext.create('B2B.view._App'));
        },

        failure_: function(){
            alert("Could not connect to server.");
        }   
    });


	},
	init: function(){
		this.callParent(arguments);
	}
});


