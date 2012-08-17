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

    	this.callParent(arguments);

    	var searchFriendButton = {
			xtype: "button",
			text: i18n.app.BTN_SEARCHFRIEND,
			ui: 'action',
			id: 'search_friend_btn',
			handler: this.onItemTap,
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

		var  friendListSearchComponent = {
			xtype: 'friendlistsearchcomponent'
		};

		var friendList = {
		    xtype: "friendlistcomponent",
		    store: Ext.getStore("Friends_Ajax"),
		    listeners: {
		    	itemtap: this.onItemTap
		      //  disclose: { fn: this.onNotesListDisclose, scope: this }
		    }
		};

		this.add([toolbar, friendListSearchComponent, friendList]);

    },
	onSearchFriendButtonTap: function(){
		this.fireEvent("onSearchCommand", this);
	},
	onItemTap: function(a, b){
		console.log('fired: ' + b);
		this.fireEvent("viewFriendDetailCommand", this, b);
	}
});