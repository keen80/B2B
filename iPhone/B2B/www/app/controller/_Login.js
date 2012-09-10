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
		values.birthDate = Ext.Date.format(values.birthDate, 'c');
		authentication.registerUserWithParams(values);
	},
	onLoginCommand: function() {
		bridge.doLoginOnFB();
	},
	init: function(){
		this.callParent(arguments);
	}
});