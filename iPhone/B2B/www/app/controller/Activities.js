Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			activitylist: "activitylist",
			activity: "activity",
			activityDetail: "activitylistdetail",
			app: "_app"
		},
		control: {
			activity: {
				viewActivityDetailCommand: "onViewActivityDetail"
			},
			activityDetail: {
				backActivityDetailCommand: "onBackActivityDetail"
			},
			activitylist: {
				itemtap: "onViewActivityDetail"
			}
		}
	},
	onViewActivityDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		var jsonData = record.data;
		this.getApp().push({
			xtype: "activitylistdetail",
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