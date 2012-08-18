Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			activitylistcontainerpanel: "activitylistcontainerpanel"
		},
		control: {
			activitylistcontainerpanel: {
				viewActivityDetailCommand: "onViewActivityDetail"
			}
		}
	},
	onViewActivityDetail: function(){
		Ext.Msg.alert('Event onViewActivityDetail Received');
	},
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore("Activities_Ajax").load();
		

	},
	init: function(){
		this.callParent(arguments);
	}
});