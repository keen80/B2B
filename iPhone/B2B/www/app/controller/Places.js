Ext.define("B2B.controller.Places", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			mapContainer: "drinkaroundmepanel",
			appContainer: "App_Container",
			app: "_app"
		},
		control: {
			mapContainer: {
				reloadCommand: "onReloadCommand"
			}
		}
	},
	onReloadCommand: function(){
		/* TODO: HOW THE HELL WE REFRESH THE REVIEW? */
		Ext.Msg.alert("TODO: Map Reload Mock");
	},
	init: function(){
		this.callParent(arguments);
	}
});



