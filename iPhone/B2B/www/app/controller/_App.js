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
		// NavigationView comes with a hidden titlebar, however if we destroy everything goes nuts
		//Ext.getCmp('ext-titlebar-1').destroy();
	}
});


