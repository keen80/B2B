Ext.define('B2B.view.Friend_Search', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'friendsearch',
	config: {
		docked: 'top'
	},
	initialize: function(){
		this.callParent(arguments);
		
		var oldValueCount = 0;

    	var searchFriendButton = {
			xtype: "button",
			text: i18n.app.BTN_SEARCHFRIEND,
			ui: 'action',
			id: 'search_friend_btn',
			iconCls: 'smiley_friend_add',
			iconMask: true,
			handler: this.onSearchFriendButtonTap,
			scope: this
		};

		var searchField = {
			xtype: 'searchfield',
			placeHolder: i18n.app.LABEL_SEARCH,
			name: 'friendfiltersearch',
			flex: 1,
			listeners : {
	            scope: this,
	            keyup: function(field) {
		           	var value = field.getValue();
		           	var store = Ext.getStore('Friends_Local');

		           	if(value < oldValueCount){
		           		store.clearFilter();
		            }

		            oldValueCount = value;
		           
		           	if (!value) {
		           		store.filterBy(function() {
		                    return true;
		                });
					} else {
						var searches = value.split(' '), regexps  = [], i;

						for (i = 0; i < searches.length; i++) {
							if (!searches[i]) return;
							regexps.push(new RegExp(searches[i], 'i'));
						};
						store.filterBy( function(record) {
		                    var matched = [];
		                          
							for (i = 0; i < regexps.length; i++) {
								var search = regexps[i];

								if (record.get('displayName').match(search) || record.get('firstName').match(search) || record.get('lastName').match(search) ) matched.push(true);
								else matched.push(false);
							};
							if (regexps.length > 1 && matched.indexOf(false) != -1) {
								return false;
							} else {
								return matched[0];
							}
						});
		            }
	            }
            }
		};

		var friendsearchtoolbar = {
			xtype: 'toolbar',
			id: 'friendsearchtoolbar',
			cls: 'sub_titlebar',
			ui: 'beerneutral',
			docked: 'top',
			items: [
				searchField,
				searchFriendButton
			]
		};
		this.add([friendsearchtoolbar]);
	},
	onSearchFriendButtonTap: function(){
		this.fireEvent("searchFriendCommand", this);
	}
});