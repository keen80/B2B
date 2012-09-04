App.views.EventsNewPlace = Ext.extend(Ext.Panel, {
    initComponent: function() {

        App.makeAutoSearchableFor(this, 'new_event_place_search_query');

        /* --- variables ---------------------------------------------------------------------------- */

        var backButton, nextButton, titleBar;
        var searchBar;
        var placesListTpl, placesList;
        var addressBookButton, allPlacesButton, wishListButton, placesTypesButtons;
        var pagination;
        var storage = Tmo.storeFilters.eventPlaces;

        /* --- init --------------------------------------------------------------------------------- */

        backButton = Tmo.BackButton.getBackButton(I18n.t('action.cancel_link'));

        nextButton = {
            text: I18n.t('action.next_link'),
            ui: 'action x-button-forward',
            handler: this.onNextAction,
            scope: this
        };

        titleBar = {
            title: I18n.t('event.actions.new.select_place_for_event'),
            dock: 'top',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ backButton, {xtype: 'spacer'}, nextButton ]
        };

        /* --- search bar --- */

        searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'bookmark',
                    iconMask: true,
                    id: 'addressBookButton',
                    search_scope: 'ab',
                    cls: (['ab','user'].indexOf(storage.get('search_scope')) != -1 ? 'x-button-action' : ''),
                    handler: this.onScopeChangeAction
                },
                {
                    xtype: 'button',
                    iconCls: 'star',
                    iconMask: true,
                    id: 'wishlistButton',
                    search_scope: 'wish',
                    cls: (['wish','user'].indexOf(storage.get('search_scope')) != -1 ? 'x-button-action' : ''),
                    handler: this.onScopeChangeAction
                },
                {
                    flex: 1,
                    xtype: 'tmo_searchfield',
                    id: 'new_event_place_search_query',
                    value: storage.get('search_query')
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    handler: this.onSearchAction,
                    hidden: true
                }
            ]
        };


        /* --- content list tpl --- */

        placesListTpl = new Ext.XTemplate.from("places-list-tpl"); 

        placesList = new Ext.List({
            flex: 1,
            plugins: [ new Tmo.PaginationListPlugin() ],
            id: 'places_list',
            cls: 'selectable',
            itemTpl: placesListTpl,
            store: App.stores.places,
            emptyText: Tmo.Utils.emptyTextForList( I18n.t('event.actions.new.place_hint') )
        });

        var placesCategories = App.createPlaceCategoriesView('categories_scroll_events_new', Tmo.storeFilters.eventPlaces);

        var placesContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "places_content",
            items: [ placesList, placesCategories ],
            listeners: {

            }
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'event_places_card',
            layout: 'card',
            dockedItems: [titleBar, searchBar],
            items: [ placesContent ]
        });

        App.views.EventsNewPlace.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onNextAction: function()
    {
        Ext.dispatch({
            controller: 'Events',
            action: 'new_form',
            historyUrl: 'Events/new/form',
            place: Ext.getCmp('places_list').getSelectedRecords()[0]
        });        
    },

    onScopeChangeAction: function()
    {
        var storage = Tmo.storeFilters.eventPlaces;
        var current_scope = storage.get('search_scope') || 'user';
        var final_scope = 'user';
        if (this.search_scope == 'ab' && current_scope == 'user')
            final_scope = 'wish';
        else if (this.search_scope == 'ab' && current_scope == 'wish')
            final_scope = 'user';
        else if (this.search_scope == 'wish' && current_scope == 'user')
            final_scope = 'ab';
        else if (this.search_scope == 'wish' && current_scope == 'ab')
            final_scope = 'user';
        else
            return;

        Ext.getCmp('addressBookButton').removeCls('x-button-action');
        Ext.getCmp('wishlistButton').removeCls('x-button-action');
        if (['ab','user'].indexOf(final_scope) != -1)
            Ext.getCmp('addressBookButton').addCls('x-button-action');
        if (['wish','user'].indexOf(final_scope) != -1)
            Ext.getCmp('wishlistButton').addCls('x-button-action');

        storage.set('search_scope', final_scope);
        storage.filter();
    },    

    onSearchAction: function()
    {
      var storage = Tmo.storeFilters.eventPlaces;
      var value = Ext.getCmp('new_event_place_search_query').getValue();
      storage.set('search_query', value);
      storage.filter();
    }
    
});

Ext.reg('EventsNewPlace', App.views.EventsNewPlace);
