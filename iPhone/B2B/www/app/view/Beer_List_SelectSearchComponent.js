Ext.define('B2B.view.Beer_List_SelectSearchComponent', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.field.Search'
	],
	xtype: 'beerlistselectsearchcomponent',
	id: 'beerlistselectsearchcomponent',
	config: {
		docked: 'top'
	},
	initialize: function(){
		this.callParent(arguments);
		var oldValueCount = 0;
		//var store = Ext.getStore('Beers_Single_Ajax');
		var store = Ext.getStore('Beers_Ajax');
		
		var matchedhistory = [];

		var searchField = {
			xtype: 'searchfield',
			placeHolder: i18n.app.LABEL_SEARCH,
			name: 'beerfiltersearch',
			flex: 1,
			listeners : {
	            scope: this,
	            clearicontap: function(field){
	            	var beerlist = Ext.getCmp("beerlistselect");
	            	var infobar = Ext.getCmp("searchinfobarselect");
	            	field.setValue("");
	            	beerlist.setStore(null);
		           	store.filterBy( function(record) {return false});
		           	beerlist.setStore(store);
		           	infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
	            },
	            keyup: function(field, e) {
		           	var value = field.getValue();
		           		value = value.replace(/[^a-zA-Z 0-9]+/g,'');
		           	var beerlist = Ext.getCmp("beerlistbeerlistselect");
		           	var beerlistcontainer = Ext.getCmp("beerlistselectcontainer");
		           	var infobar = Ext.getCmp("searchinfobarselect");

			           	if((!value||value < oldValueCount)){
			           		beerlist.setStore(null);
			            }
			            
			            oldValueCount = value;

			           	if(value.length > 2){
			           		beerlist.setStore(null);
			           		store.clearFilter();

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
							var howmany = store.getCount();

							if(howmany > 0){
								infobar.setHtml(utils.__(i18n.app.HINT_SEARCHRESCHAR, store.getCount()));
			        			beerlist.setStore(store);
			        		}else{
			        			infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
			        		}
			           	}else{
			           		beerlist.setStore(null);
			           		store.filterBy( function(record) {return false});
			           	}
		           		beerlist.setStore(store);
		           		if(!store.getCount() > 0){
			           		if(value.length < 3 && value.length > 0 ){
			           			infobar.setHtml(utils.__(i18n.app.HINT_SEARCH1CHAR, 3 - value.length));
			           		}else{
			           			if(value.length > 0) {
			           				infobar.setHtml(utils.__(i18n.app.HINT_SEARCHNORES));
			           			}else{
			        				infobar.setHtml(i18n.app.HINT_SEARCH2CHAR);
			           			}
			           		}
		           		}

		           		if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
			                e.stopEvent();
			                field.element.dom.blur();
			                window.scrollTo(0,0);
			                var activeItem = beerlist.setActiveItem(1);
			                console.log(beerlist.getActiveItem());
			            }
	           }
            }
		};

		var addBeerButton ={
			xtype: 'button',
				text: i18n.app.BTN_ADDBEER,
				ui: 'action',
				id: 'add_beerselect_btn',
				handler: this.onAddBeerButtonTap,
				scope: this
		}
		var subtoolbar = {
			xtype: 'toolbar',
			cls: 'sub_titlebar',
			id: 'searchselectbeercomponenttoolbar',
			ui: 'neutral',
			docked: 'top',
			items: [
				searchField,
				addBeerButton
			]
		};

		var searchInfoBar = {
			xtype: 'container',
			id: "searchinfobarselect",
			docked: 'top',
			html: "<span class='searchInfoBar'>"+i18n.app.HINT_SEARCH2CHAR+"</span>"
		}
		this.add([subtoolbar, searchInfoBar]);
	},
	onAddBeerButtonTap: function(){
		this.fireEvent("beerAddCommand", this);
	}
});