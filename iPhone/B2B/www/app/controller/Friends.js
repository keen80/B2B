Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendListContainer: "friendlistcontainerpanel",
			friendProfile: "friendprofile"
		},
		control: {
			friendListContainer: {
				onSearchCommand: "onSearchFriend",
				viewFriendDetailCommand: "onViewFriendDetail"
			},
			friendsProfile: {
				deleteFriendCommand: "onDeleteFriend",
			}
		}
	},
	onSearchFriend: function(){
		Ext.Msg.alert('Event SearchFriend Received');
	},
	onDeleteFriend: function(){
		Ext.Msg.alert('Event DeleteFriend Received');
	},
	onViewFriendDetail: function(a, b){
		var jsonData = Ext.getStore('Friends_Ajax').getAt(b);
		console.log(jsonData);
	},
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("Friends_Ajax").load();

	},
	init: function(){
		this.callParent(arguments);
	}
});