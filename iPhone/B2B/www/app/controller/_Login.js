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
		var date = Ext.Date.format(values.birthDate, 'c'),
			params = {
				idUser: values.idUser,
				username: values.idUser,
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