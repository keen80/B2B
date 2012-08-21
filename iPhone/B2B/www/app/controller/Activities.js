Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			activitylistcomponent: "activitylistcomponent",
			activitylistcontainerpanel: "activitylistcontainerpanel",
			activityDetail: "activitydetailpanel",
			app: "_app"
		},
		control: {
			activitylistcontainerpanel: {
				viewActivityDetailCommand: "onViewActivityDetail"
			},
			activityDetail: {
				backActivityDetailCommand: "onBackActivityDetail"
			},
			activitylistcomponent: {
				itemtap: "onViewActivityDetail"
			}
		}
	},
	onViewActivityDetail: function(a, b, c, record){
		setTimeout(function(){a.deselect(b);},500);
		var jsonData = record.data;
		this.getApp().push({
			xtype: "activitydetailpanel",
			jsonData: jsonData
		});
	},
	onBackActivityDetail: function() {
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore("Activities_Ajax").load();

	},
	init: function(){
		this.callParent(arguments);
	}
});