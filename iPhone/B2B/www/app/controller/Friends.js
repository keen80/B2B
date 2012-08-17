Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendListContainer: "friendlistcontainerpanel",
			friendProfile: "friendprofile"
		},
		control: {
			friendListContainer: {
				addFriendCommand: "onAddFriend",
				viewFriendDetailCommand: "onViewFriendDetail"
			},
			friendsProfile: {
				deleteFriendCommand: "onDeleteFriend",
			}
		}
	},
	onAddFriend: function(){
		Ext.Msg.alert('Event AddFriend Received');
	},
	onDeleteFriend: function(){
		Ext.Msg.alert('Event DeleteFriend Received');
	},
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("Friends_Ajax").load();

	},
	init: function(){
		this.callParent(arguments);
	}
});