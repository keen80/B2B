Ext.define('B2B.view.Friend_List_SearchComponent', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'friendlistsearchcomponent',
	id: 'friendlistsearchcomponent',
	config: {
		docked: 'top',
		items: [
			{
				
			}
		]
	},
	initialize: function(){
		this.callParent(arguments);

		var searchField = {
			xtype: 'searchfield',
			placeHolder: i18n.app.LABEL_SEARCH,
			name: 'friendfiltersearch',
			flex: 1
		};

		/*var addFriendButton ={
			xtype: 'button',
				text: i18n.app.BTN_ADDFRIEND,
				ui: 'action',
				id: 'add_friend_btn',
				handler: this.onAddFriendButtonTap,
				scope: this
		}*/

		var toolbar = {
			xtype: 'toolbar',
			id: 'searchfriendcomponenttoolbar',
			cls: 'sub_titlebar',
			ui: 'neutral',
			docked: 'top',
			items: [
				searchField,
				//addFriendButton
			]
		};
		this.add([toolbar]);
	},
	onAddFriendButtonTap: function(){
		this.fireEvent("addFriendCommand", this);
	}
});