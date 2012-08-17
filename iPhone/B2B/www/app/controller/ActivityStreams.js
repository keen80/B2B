Ext.define("B2B.controller.ActivityStreams", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			dashboard: "dashboardpanel"
		},
		control: {
			dashboard: {
				viewActivityDetailCommand: "onViewActivityDetail"
			}
		}
	},
	onViewActivityDetail: function(){
		Ext.Msg.alert('Event onViewActivityDetail Received');
	},
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("ActivityStreams").load();
		

	},
	init: function(){
		this.callParent(arguments);
	}
});