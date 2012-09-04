App.views.EventGuestsIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {        

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, titleBar, searchBar;
        var usersListTpl, usersList;
        var storeFilter = Tmo.storeFilters.eventGuests;

        var filterBar = FilterBar(this, storeFilter, this.onScopeChangeAction, {}, this.tabs);

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton();

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: this.title,
            defaults: {
                iconMask: true
            },

            items: [ backButton ]
        };

        /* --- search bar --------------------------------------------------------------------------- */

        searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {
                    xtype: 'tmo_searchfield',
                    flex: 1,
                    id: 'events_guests_search_query',
                    value: storeFilter.get('search_query')
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    handler: this.onSearchAction,
                    event: this.event,
                    id: 'search_button',
                    scope: this
                }
            ]
        };        

        usersListTpl = new Ext.XTemplate.from("network-list-tpl");

        usersList = new Ext.List({
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            id: 'users_list',
            itemTpl: usersListTpl,
            store: App.stores.event_guests,
            listeners: {
                selectionchange:
                {
                    fn: this.onShowAction                    
                },
                itemswipe:
                {
                    fn: this.onSwipeAction                    
                }
            }
        });

        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            layout: 'card',
            dockedItems: [titleBar, filterBar.getBar(), searchBar],
            items: [usersList]
        });

        App.views.EventGuestsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(sel, records) {        
        if (records[0] !== undefined) {
            Ext.dispatch({
                controller: 'Network',
                action: 'show',
                historyUrl: 'Network/show/'+records[0].getId(),
                user_id: records[0].getId() 
            });
        }
    },

    onSwipeAction: function( dataview, index, item, e) {
        // console.log(dataview, index, item, e);
//        Ext.get(item).down('.bt').setStyle('display', 'block');
    },    

    onScopeChangeAction: function(view, filter, scope)
    {
      Ext.getCmp("filterBar").setDisabled(true);
      filter.set('search_scope', scope);
      filter.set('event_id', view.event.getId());
      filter.filter(function() {Ext.getCmp("filterBar").setDisabled(false);});
    },    

    onSearchAction: function() {
      var storeFilter = Tmo.storeFilters.eventGuests;
      var value = Ext.getCmp('events_guests_search_query').getValue();

      Ext.getCmp("filterBar").setDisabled(true);
      storeFilter.set('search_query', value);
      storeFilter.set('event_id', this.event.getId());
      storeFilter.filter(function() {Ext.getCmp("filterBar").setDisabled(false);});
    }
    
});

Ext.reg('EventGuestsIndex', App.views.EventGuestsIndex);