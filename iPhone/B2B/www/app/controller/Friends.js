Ext.define("B2B.controller.Friends", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			friendListContainer: "friends",
			friendDetail: "friendlistdetail",
			friendFinder: "friendfinderpanel",
			friendsearch: "friendsearch",
			app: "_app"
		},
		control: {
			friendsearch: 
			{
				searchFriendCommand: "onSearchFriend"
			},
			friendListContainer: {
				searchFriendCommand: "onSearchFriend",
				viewFriendDetailCommand: "onViewFriendDetail"
			},
			friendDetail: {
				removeFriendDetailCommand: "onRemoveFriend",
				backFriendDetailCommand: "onBackFriendDetail"
			},
			friendFinder: {
				backFriendFinderCommand: "onBackFriendDetail"
			},
			friendlist: {
				itemtap: "onViewFriendDetail"
			}
		}
	},
	onSearchFriend: function(resource){
		var rockIt = function(resource){
			HH.log(resource);
		};
		this.getApp().push({
			xtype: "friendinvitepanel"
		});
	//confirm(i18n.app.DIALOG_YOUSURE, rockIt(resource));
	},
	onRemoveFriend: function(){
		var removeIt = function(){
			this.getApp().pop();
		};

		confirm(i18n.app.DIALOG_YOUSURE, removeIt);
	},
	onViewFriendDetail: function(a, b, c, record){
		/* Deselection of the list */
		setTimeout(function(){a.deselect(b);},500);

		var ajax_store = Ext.getStore('Friends_Local');
		var jsonData = ajax_store.getAt(ajax_store.findExact("id", record.data.id));
		this.getApp().push({
			xtype: "friendlistdetail",
			jsonData: jsonData
		});

	},
	onBackFriendDetail: function(){
		this.getApp().pop();
	},
	launch: function(){
		this.callParent(arguments);
	},
	init: function(){
		this.callParent(arguments);
	}
});