Ext.define("B2B.controller.Message", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
		},
		control: {
			app: {
				message: "onMessage"
			}
		}
	},
	onMessage: function(a, msg, action){

	},
	onBadge: function(a, msg, action){

	},
	init: function(){
		this.callParent(arguments);
	}
});


