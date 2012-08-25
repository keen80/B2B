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
				removeFriendDetailCommand: "onRemoveFriend",
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
	onRemoveFriend: function(){
		//Ext.Msg.alert('Event DeleteFriend Received');
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
			xtype: "frienddetailpanel",
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