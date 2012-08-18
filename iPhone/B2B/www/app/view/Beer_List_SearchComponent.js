Ext.define('B2B.view.Beer_List_SearchComponent', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'beerlistsearchcomponent',
	id: 'beerlistsearchcomponent',
	config: {
		docked: 'top',
		items: [
			{
				
			}
		]
	},
	initialize: function(){
		this.callParent(arguments);
		var oldValueCount = 0;
		var store = Ext.getStore('Beers_Ajax');

		var searchField = {
			xtype: 'searchfield',
			placeHolder: i18n.app.LABEL_SEARCH,
			name: 'beerfiltersearch',
			flex: 1,
			listeners : {
	            scope: this,
	            clearicontap: function(){
	            	store.clearFilter();
	            },
	            keyup: function(field) {
		           	var value = field.getValue();
		           	
		           	if(!value||value < oldValueCount){
		           		store.clearFilter();
		            }

		           	if (value) {
		           		oldValueCount = value;
						var searches = value.split(' '), regexps  = [], i;

						for (i = 0; i < searches.length; i++) {
							if (!searches[i]) return;
							regexps.push(new RegExp(searches[i], 'i'));
						};

						store.filterBy( function(record) {
		                    var matched = [];
		                          
							for (i = 0; i < regexps.length; i++) {
								var search = regexps[i];

								if (record.get('name').match(search) ) matched.push(true);
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

		var addBeerButton ={
			xtype: 'button',
				text: i18n.app.BTN_ADDBEER,
				ui: 'action',
				id: 'add_beer_btn',
				handler: this.onAddBeerButtonTap,
				scope: this
		}

		var toolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			id: 'searchbeercomponenttoolbar',
			ui: 'neutral',
			docked: 'top',
			items: [
				searchField,
				addBeerButton
			]
		};
		this.add([toolbar]);
	},
	onAddBeerButtonTap: function(){
		this.fireEvent("beerAddCommand", this);
	}
});