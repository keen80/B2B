Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendListContainer: "friendlistcontainerpanel",
			friendDetail: "frienddetailpanel",
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
		}
	},
	onSearchFriend: function(){
		Ext.Msg.alert('Event SearchFriend Received');
	},
	onDeleteFriend: function(){
		Ext.Msg.alert('Event DeleteFriend Received');
	},
	onViewFriendDetail: function(what, record){
		var jsonData = (Ext.getStore('Friends_Ajax').getAt(record)).data;
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
		Ext.getStore("Friends_Ajax").load();

	},
	init: function(){
		this.callParent(arguments);
	}
});