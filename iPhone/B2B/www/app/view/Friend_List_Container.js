Ext.define('B2B.view.Friend_List_Container', {
	extend: 'Ext.Panel',
	xtype: 'friendlistcontainerpanel',
	id: 'friendlistcontainerpanel',
	config: {
		title: i18n.app.LABEL_FRIENDS,
		iconCls: 'user_list',
        layout: {
        	type: 'fit'
        }
	},
	initialize: function(){

		var me = this;

    	this.callParent(arguments);

    	var searchFriendButton = {
			xtype: "button",
			text: i18n.app.BTN_SEARCHFRIEND,
			ui: 'action',
			id: 'search_friend_btn',
			handler: this.onSearchFriendButtonTap,
			scope: this
		};

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			docked: 'top',
			items: [
				{
					xtype: 'spacer'
				},
				searchFriendButton
			]
		};

		var friendListSearchComponent = {
			xtype: 'friendlistsearchcomponent'
		};

		var friendList = {
		    xtype: "friendlistcomponent",
		    store: Ext.getStore("Friends_Local"),
		    ui: 'round',
		    grouped: true,
		    indexBar: true,
		   /*	onItemDisclosure: function(a, b, c, d, e) {
		   		me.onListItemTap(c);
		   	}*/
		};

		this.add([toolbar, friendListSearchComponent, friendList]);

    },
	onSearchFriendButtonTap: function(){
		this.fireEvent("searchFriendCommand", this);
	}/*,
	onListItemTap: function(record){
		this.fireEvent("viewFriendDetailCommand", this, record);
	}*/
});