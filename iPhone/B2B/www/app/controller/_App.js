Ext.define("B2B.controller._APP", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			_App: "_app",
		},
		control: {
			_App: {
				initialize: "onInitialize",
			}
		}
	},
	onInitialize: function(){
		/* May be we are checkin there for auth? */ 
	},
	onSyncProfileStore: function(){

	},
	init: function(){
		this.callParent(arguments);
	}
});


