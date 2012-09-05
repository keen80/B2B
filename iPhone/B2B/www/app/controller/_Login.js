Ext.define("B2B.controller._Login", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			login: "#btn_login",
			register: "#btn_register",
			app: "_app"
		},
		control: {
			login:{
				loginCommand: "onLoginCommand"
			},
			register: {
				registerCommand: "onRegisterCommand"
			}
		}
	},
	onRegisterCommand: function(source, values) {
		Ext.Viewport.setMasked(true);
		var store = Ext.getStore("Profile_Local"),
			date = Ext.Date.format(values.birthDay, 'c');
		Ext.Ajax.request({
			url: "http://192.168.1.7:8080/birrettaservice/rest/bserv/saveUser",
			method: "POST",
			headers: {
        		"btUsername": values.email
    		},
			params: {
				idUser: values.email,
				username: values.email,
				displayName: values.displayName,
				email: values.email,
				gender: values.gender,
				nationality: values.nationality,
				birthDate: date
			},
			success: function(result) {
				Ext.Viewport.setMasked(false);
				var json = Ext.decode(result.responseText, true);
				if (json && json.response.status.code < 200) {
					HH.log("---> Step: Register user success");
					store.add({
						idUser: values.email,
						username: values.email,
						displayName: values.displayName,
						email: values.email,
						gender: values.gender,
						nationality: values.nationality,
						birthDate: date
					});
					store.sync();
					var data = store.first().data;
					utils.generateToken(data, store, Ext.Viewport);
				} else {
					HH.log("--> Step: Generate token failure - CODE: " + json.response.status.code);
					utils.title(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				utils.title(i18n.app.COMMON_ATTENTION, i18n.app.ALERT_ERRORCOMMUNICATION);
			}
		});
	},
	onLoginCommand: function(){
		if (Ext.feature.has.Touch) {
			document.location = "selector://targets=socialManager:initLogin";
		} else {
			var register = Ext.create('B2B.view._Register');

			Ext.Viewport.removeAt(0, true);
			Ext.Viewport.add(register);
			// HH.log("---> Step: FB Skip login");
   //      	goingTo.step2("Loading Store.Profile_Ajax");
   //      	HH.log("---> Step: Clear app, loading _App");
   //      	Ext.Viewport.removeAll(true, true);
   //      	Ext.Viewport.add(Ext.create('B2B.view._App'));
		}
		/*
			Check Auth via AJAX

		*/

/*		var username = Ext.getCmp('loginform_username').getValue();
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
*/
	},
	init: function(){
		this.callParent(arguments);
	}
});


