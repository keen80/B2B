Ext.define("B2B.controller.Activities", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			app: "_app",
			activity: "activity",
			activitylist: "activitylist",
			activitylistdetail: "activitylistdetail",
			profile: "userprofile",
			historypanel: "historypanel"
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
			},
			profile: {
				activityListProfileCommand: "onShowMyActivityList"
			},
			historypanel: {
				backToProfileCommand: "onBackActivityDetail"
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
	onShowMyActivityList : function()
	{
		HH.log("arrivato qui activity");
		this.getApp().push({
			xtype: "historypanel"
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