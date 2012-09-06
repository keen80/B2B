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
			url: HH.IP_PORT_SERVER+"/birrettaservice/rest/bserv/saveUser",
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
			};

		authentication.registerUserWithParams(params);
	},
	onLoginCommand: function() {
		bridge.doLoginOnFB();
	},
	init: function(){
		this.callParent(arguments);
	}
});


