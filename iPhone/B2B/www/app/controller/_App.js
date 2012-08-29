Ext.define("B2B.controller._App", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
		},
		control: {
			app: {
				initialize: "onInitialize"
			}
		}
	},
	onInitialize: function(){

	},
	init: function(){
		this.callParent(arguments);
	}
});


