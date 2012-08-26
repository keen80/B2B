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


        var header = {
            xtype: 'container',
            cls: 'header_img',
            height: 50,
            width: '100%',
            docked: 'top',
            html: '<img src="'+HH.default_user64+'" width="100%" height="50px" >'
        };
/*
    	var searchFriendButton = {
			xtype: "button",
			text: i18n.app.BTN_SEARCHFRIEND,
			ui: 'action',
			id: 'search_friend_btn',
			handler: this.onSearchFriendButtonTap,
			scope: this
		};
		*/
/*
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
		*/

		var friendListSearchComponent = {
			xtype: 'friendlistsearchcomponent'
		};

		var friendList = {
		    xtype: "friendlistcomponent",
		    store: Ext.getStore("Friends_Local"),
		    ui: 'round',
		    grouped: true,
		};

		this.add([/*toolbar, */header, friendListSearchComponent, friendList]);

    }, /*
	onSearchFriendButtonTap: function(){
		this.fireEvent("searchFriendCommand", this);
	},
	onListItemTap: function(record){
		this.fireEvent("viewFriendDetailCommand", this, record);
	}*/
});