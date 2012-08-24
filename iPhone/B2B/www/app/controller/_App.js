Ext.define("B2B.controller._App", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			_App: "_app",
		},
		control: {
			_App: {
				initialize: "onInitialize"
			}
		}
	},
	onInitialize: function(){

	},
	onSyncProfileStore: function(){

	},
	init: function(){
		this.callParent(arguments);
	}
});


