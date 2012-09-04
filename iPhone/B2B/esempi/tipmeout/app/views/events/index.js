App.views.EventsIndex = Ext.extend(Ext.Panel, {
initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */
        var backButton, filterButton, titleBar;
        var listButton, mapButton, viewTypesButtons;
        var searchBar;
        var createButton, bottomBar;
        var eventsMap;
        var eventsListTpl, eventsList;
        var storeFilter = Tmo.storeFilters.events;
        var filterBar;
        var eventObjFor = this.eventObjFor;
        var eventObj = this.eventObj;

        /* --- init --------------------------------------------------------------------------------- */

        if (eventObjFor === 'place')
        {
            filterBar = FilterBar(this, storeFilter, this.onScopeChangeAction, {}, (new App.models.Event()).tabsForPlaceEvents());
        }
        else if (eventObjFor === 'user') {}
        else
        {
            App.makeAutoSearchableFor(this, 'events_search_query');
            filterBar = FilterBar(this, storeFilter, this.onScopeChangeAction, {}, (new App.models.Event()).tabsForEvents());
        }

        backButton = Ext.isString(eventObjFor) ? Tmo.BackButton.getBackButton() : {xtype: 'button', hidden: true};

        filterButton = {
            text: I18n.t('action.filter_link'),
            id: 'filter_events_bt',
            handler: this.onFilterAction,
            ui: 'action'
        };

        /* --- view types --- */

        listButton = {
            text: I18n.t('action.list_link'),
            search_view: 'list',
            pressed: true,
            handler: this.onViewChangeAction
        };

        mapButton = {
            text: I18n.t('action.map_link'),
            search_view: 'map',
            handler: this.onViewChangeAction
        };

        viewTypesButtons = {
            xtype: 'segmentedbutton',
            centered: true,
            items: [listButton, mapButton],
            listeners: {
            	toggle: function(container, button, pressed) {
            		Tmo.Adapters.keyboard.hide();
            	}
            }

        };

        titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            centered: true,
            cls: 'centered-buttons',
            layout: {
                pack: 'center'
            },            
            defaults: {
                iconMask: true
            },


            items: Ext.isString(eventObjFor) ? [ backButton, {xtype: 'spacer'}, {xtype: 'spacer'} ] : [ backButton, viewTypesButtons, filterButton ] 
        };

        /* --- search bar --- */

        searchBar = {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            items: [
                {
                    xtype: 'tmo_searchfield',
                    flex: 1,
                    id: 'events_search_query',
                    value: storeFilter.get('search_query')
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    handler: this.onSearchAction,
                    hidden: true
                }
            ]
        };

        /* --- bottom bar --- */

        var locationButton = Tmo.MyLocationMarker.aroundMeButton("events_map", Tmo.storeFilters.events);

        createButton = {
            text: I18n.t('action.create_new_link'),
            ui: 'confirm',
            handler: this.onNewAction
        };

        bottomBar = {
            dock: 'bottom',
            xtype: 'toolbar',
            defaults: {
                iconMask: true
            },

            items: [ locationButton, {xtype: 'spacer'}, createButton ]
        };

        /* --- content tpl --- */

        eventsListTpl = new Ext.XTemplate.from("events-list-tpl");

        eventsList = new Ext.List({
            flex: 1,
            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            id: 'events_list',
            itemTpl: eventsListTpl,
            store: App.stores.events,
            grouped: true,
            listeners: {
                itemtap:
                {
                    fn: this.onShowAction
                },
                swipe:
                {
                    fn: this.onSwipeAction
                },
                beforedestroy:function()
                {
                  if ( App.mapListObserver ) {
                      App.mapListObserver.clearMarkers();
                  }
                  App.mapListObserver = null;
                }
            }
        });

        /* --- content map tpl --- */

        eventsMap = new Ext.Map({
            id: 'events_map',
            mapOptions : {
                zoom: 13,
                disableDoubleClickZoom: false,
                streetViewControl: false
            },
            listeners: {
                mapload: function(centre, bounds, boundingRadius, bufferRadius, zoom)
                {
                    if ( this.isVisible() )
                    {
                        var storeFilter = Tmo.storeFilters.events;
                        storeFilter.set('lat', centre.lat );
                        storeFilter.set('lng', centre.lng );
                        storeFilter.set('radius', boundingRadius + bufferRadius );
                        storeFilter.filter();
                    }
                }
            },
            hidden: true
        });

        var eventsContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            id: "events_content",
            items: [ eventsList ]
        });

        /* --- create ------------------------------------------------------------------------------ */

        var content = [];
        if (eventObjFor == "place")
            content = [titleBar, App.headers.render('places/shared/header', eventObj.data), filterBar.getBar()];
        else if (eventObjFor == "user")
            content = [titleBar, App.headers.render('profile/shared/header', eventObj)];
        else
            content = [titleBar, filterBar.getBar(), searchBar, bottomBar];

        Ext.apply(this, {
            id: 'events_card',
            layout: 'card',
            dockedItems:content,
            items: [eventsContent, eventsMap],
            listeners: {
                deactivate: function(c){
                    var storeFilter = Tmo.storeFilters.events;
                    if (storeFilter.get("search_query") && storeFilter.get("search_query").length > 0)
                        storeFilter.unregisterProperty("search_query");
                }
            }
        });

        App.views.EventsIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(dataview, index, item, e)
    {
        var event = dataview.store.getAt(index);
        event.redirectToShow();
    },

    onSwipeAction: function( dataview, index, item, e) {
        Ext.alert("SWIPED");
//        Ext.get(item).down('.bt').setStyle('display', 'block');
    },    

    onSearchAction: function()
    {
      var storeFilter = Tmo.storeFilters.events;
      var value = Ext.getCmp('events_search_query').getValue();

      storeFilter.set('search_query', value);
      storeFilter.filter();
    },

    onFilterAction: function() {
        Ext.dispatch({
            controller: 'Events',
            action: 'filter',
            historyUrl: 'Events/filter'
        });
    },

    onScopeChangeAction: function(view, filter, scope)
    {
        Ext.getCmp("filterBar").setDisabled(true);
        filter.set('search_scope', scope);
        filter.filter(function() {Ext.getCmp("filterBar").setDisabled(false);});
    },

    onNewAction: function() {
        Ext.dispatch({
            controller: 'Events',
            action: 'new_place',
            historyUrl: 'Events/new/place'
        });
    },

    onViewChangeAction: function()
    {
        if (this.search_view == "map")
        {
            var events_card = Ext.getCmp('events_card');
            var events_map = Ext.getCmp('events_map');
            var events_list = Ext.getCmp('events_list');

            if (!App.mapListObserver) {
              App.mapListObserver = new MapListObserver( events_card, events_map, events_list );
            }
            App.mapListObserver.renderMarkers();

            Ext.getCmp('events_content').hide();
            events_map.show();
        }
        else if (this.search_view == "list")
        {
            MapListObserver.hideInfoWindows();
            Ext.getCmp('events_content').show();
            Ext.getCmp('events_map').hide();
        }
    }
});

Ext.reg('EventsIndex', App.views.EventsIndex);