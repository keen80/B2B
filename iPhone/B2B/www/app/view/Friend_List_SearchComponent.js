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
			flex: 1,
			listeners : {
	            scope: this,
	            keyup: function(field) {
		           	var value = field.getValue();
		           	var store = Ext.getStore('Friends_Ajax');
		           	
		           	store.clearFilter();
		           
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

		var toolbar = {
			xtype: 'toolbar',
			id: 'searchfriendcomponenttoolbar',
			cls: 'sub_titlebar',
			ui: 'neutral',
			docked: 'top',
			items: [
				searchField,
			]
		};
		this.add([toolbar]);
	},
	onAddFriendButtonTap: function(){
		this.fireEvent("addFriendCommand", this);
	}
});