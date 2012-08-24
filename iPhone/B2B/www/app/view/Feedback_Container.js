Ext.define('B2B.view.Feedback_Container', {
	extend: 'Ext.Panel',
	xtype: 'feedbackcontainerpanel',
	id: 'feedbackcontainerpanel',
	config: {
		title: i18n.app.FORM_FEEDBACK
	},
	initialize: function(){
		this.callParent(arguments);

/*		var feedbackForm = {
			xtype: "button",
			text: i18n.app.BTN_SEARCHFRIEND,
			ui: 'action',
			id: 'search_friend_btn',
			handler: this.onSearchFriendButtonTap,
			scope: this
		};

		};

		this.add([toolbar, friendListSearchComponent, friendList]);*/

	},
	onSearchFriendButtonTap: function(){
		this.fireEvent("searchFriendCommand", this);
	}/*,
	onListItemTap: function(record){
		this.fireEvent("viewFriendDetailCommand", this, record);
	}*/
});