Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendListContainer: "friendlistcontainerpanel",
			friendDetail: "frienddetailpanel",
			friendFinder: "friendfinderpanel",
			app: "_app"
		},
		control: {
			friendListContainer: {
				searchFriendCommand: "onSearchFriend",
				viewFriendDetailCommand: "onViewFriendDetail"
			},
			friendDetail: {
				deleteFriendCommand: "onDeleteFriend",
				backFriendDetailCommand: "onBackFriendDetail"
			},
			friendFinder: {
				backFriendFinderCommand: "onBackFriendDetail"
			},
			friendlistcomponent: {
				itemtap: "onViewFriendDetail"
			}
		}
	},
	onSearchFriend: function(){
		this.getApp().push({
			xtype: "friendfinderpanel"
		});
	},
	onDeleteFriend: function(){
		Ext.Msg.alert('Event DeleteFriend Received');
	},
	onViewFriendDetail: function(a, b, c, record){
	//	var jsonData = (Ext.getStore('Friends_Local').getAt(record)).data;
		var jsonData = record.data;
		this.getApp().push({
			xtype: "frienddetailpanel",
			jsonData: jsonData
		});

	},
	onBackFriendDetail: function(){
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore("Friends_Ajax").load();

	},
	init: function(){
		this.callParent(arguments);
	}
});