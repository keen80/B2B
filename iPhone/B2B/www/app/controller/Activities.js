Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			activity: "activity",
			activitylist: "activitylist",
			activitylistdetail: "activitylistdetail"
		},
		control: {
			activity: {
				viewActivityDetailCommand: "onViewActivityDetail"
			},
			activitylistdetail: {
				backActivityDetailCommand: "onBackActivityDetail"
			},
			activitylist: {
				itemtap: "onViewActivityDetail"
			}
		}
	},
	/* Transizione popup activity detail */
	onViewActivityDetail: function(a, b, c, record){
		/* Deselezione lista */
		setTimeout(function(){a.deselect(b);},500);
		var jsonData = record.data;
		/* Init Popup */
		this.getApp().push({
			xtype: "activitylistdetail",
			id: "activitylistdetail",
			jsonData: jsonData
		});
	},
	onBackActivityDetail: function() {
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});