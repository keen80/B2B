App.views.PlacesIndex = Ext.extend(Ext.Panel, {
    initComponent: function() {

        /* --- variables ---------------------------------------------------------------------------- */

        App.makeAutoSearchableFor(this);

        var filterButton, titleBar, placesBar;
        var listButton, mapButton, viewTypesButtons;
        var searchBar;
        var placesListTpl, placesList;
        var placesMap;
        var storeFilter = Tmo.storeFilters.places;

        /* --- init --------------------------------------------------------------------------------- */

        var locationButton = Tmo.MyLocationMarker.aroundMeButton("places_map", Tmo.storeFilters.places);

        filterButton = {
            text: I18n.t('action.filter_link'),
            id: 'filter_places_bt',
            hidden: Ext.isEmpty( storeFilter.get('category_id') ),
            handler: this.onFilterAction,
            ui: 'action',
            scope: this
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

            items: [ locationButton, viewTypesButtons, filterButton ]
        };

        placesBar =  {
            id: 'places_bar',
            dock: 'top',
            xtype: 'toolbar',
            ui: 'light medium-size',
            defaults: {
                iconMask: true
            },
            hidden: true,
            title: '',

            items: [
                { xtype: 'button', iconCls: 'arrow_left', handler: this.onPlaceBarUpdateOffset, placeOffset: -1 },
                { xtype: 'spacer' },
                { xtype: 'button', iconCls: 'arrow_right', handler: this.onPlaceBarUpdateOffset, placeOffset: 1 }
            ]
        };

        /* --- search bar --- */

        searchBar = {
            id: 'search_toolbar',
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
                    cls: (['ab','user'].indexOf(storeFilter.get('search_scope')) != -1 ? 'x-button-action' : ''),
                    handler: this.onScopeChangeAction
                },
                {
                    xtype: 'button',
                    iconCls: 'star',
                    iconMask: true,
                    id: 'wishlistButton',
                    search_scope: 'wish',
                    cls: (['wish','user'].indexOf(storeFilter.get('search_scope')) != -1 ? 'x-button-action' : ''),
                    handler: this.onScopeChangeAction
                },
                {
                    xtype: 'tmo_searchfield',
                    flex: 1,
                    id: 'search_query',
                    value: storeFilter.get('search_query')
                },
                {
                    text: I18n.t('action.search_link'),
                    ui: 'action',
                    id: 'search_button',
                    hidden: true,
                    handler: this.onSearchAction
                }
            ]
        };

        /* --- content list tpl --- */

        placesListTpl = new Ext.XTemplate.from("places-list-tpl");

        placesList = new Ext.List({
            flex: 1,

            plugins: [
                new Tmo.PaginationListPlugin()
            ],
            id: 'places_list',
            grouped: true,
            pinHeaders: false,
            selectedItemCls: '',
            itemTpl: placesListTpl,
            store: App.stores.places,
            listeners: {
                itemtap:
                {
                    fn: this.onShowAction
                },
                itemswipe:
                {
                    fn: this.onSwipeAction
                    }
                }
        });

        /* --- content map tpl --- */

        placesMap = new Ext.Map({
            id: 'places_map',
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
                        var storeFilter = Tmo.storeFilters.places;
                        storeFilter.set('lat', centre.lat );
                        storeFilter.set('lng', centre.lng );
                        storeFilter.set('radius', boundingRadius + bufferRadius );
                        storeFilter.filter();
                    }
                }
            },
            hidden: true
        });

        /* --- categories --- */

        var placesCategories = App.createPlaceCategoriesView('categories_scroll', storeFilter);

        var placesContent = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center'
            },
            id: "places_content",
            items: [ placesList, placesCategories ],
            listeners: {
                show: function()
                {
                    this.doComponentLayout();
                },
                hide: function()
                {
                    this.doComponentLayout();
                }
            }
        });


        /* --- create ------------------------------------------------------------------------------ */

        Ext.apply(this, {
            id: 'places_card',
            layout: 'card',
            fullscreen: false,
            dockedItems: [titleBar, searchBar, placesBar],
            items: [ placesContent, placesMap ],
            listeners: {
                deactivate: function(c){
                    if (App.mapListObserver) {
                        App.mapListObserver.clearMarkers();
                    }
                    App.mapListObserver = null;
                }
            }
        });

        App.views.PlacesIndex.superclass.initComponent.call(this);
    },

    /* --- actions ------------------------------------------------------------------------------ */

    onShowAction: function(dataview, index, item, e)
    {
        var place = dataview.store.getAt(index);

        if ( Ext.get(item).down('.google_place') ) {

            var map = Ext.getCmp('places_map').map;
            App.addPlaceByReference( map, place.get('gp_reference') );

        } else {

            var bt = Ext.get(item).down('.bt');
            if ( bt.getStyle('display') == 'none' ) {
                place.redirectToShow();
            }

        }
    },

    onSwipeAction: function(dataview, index, item, e)
    {
        if ( !Tmo.storeFilters.places.check('search_scope', 'all') )
        {
            var place = dataview.store.getAt(index);
            var bt = Ext.get(item).down('.bt');

            Tmo.Utils.onSwipe(e, bt, function(b,e) {
                if ( Tmo.storeFilters.places.check('search_scope', 'ab') )
                {
                    place.bookmark('removePlaceBookmark', function(result) {
                      Tmo.storeFilters.places.store.load();
                    });
                }
                else if ( Tmo.storeFilters.places.check('search_scope', 'wish') )
                {
                    place.bookmark('removeWishBookmark', function(result) {
                      Tmo.storeFilters.places.store.load();
                    });
                }
                else if ( Tmo.storeFilters.places.check('search_scope', 'user') )
                {
                    place.removeBookmark(function(result) {
                      Tmo.storeFilters.places.store.load();
                    });
                }
            });
        }
    },

    onFilterAction: function()
    {
        Ext.dispatch({
            controller: 'Places',
            action: 'filter',
            historyUrl: 'Places/filter'
        });
    },

    onSearchAction: function()
    {
      var storeFilter = Tmo.storeFilters.places;
      var value = Ext.getCmp('search_query').getValue();

      Tmo.LoadMask.show(null, Ext.getCmp('places_map').el);

      storeFilter.set('search_query', value);
      storeFilter.filter(function() {
          Tmo.LoadMask.hide();
          Ext.getCmp('places_card').renderPlacesOnMap();
          Ext.getCmp('places_card').onPlacesBarUpdateBar();
          Ext.getCmp("search_button").enable();
          App.viewport.doLayout();
      });

      App.viewport.doLayout();
    },

    onScopeChangeAction: function()
    {
      var storeFilter = Tmo.storeFilters.places;

      var current_scope = storeFilter.get('search_scope') || 'user';
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

      Tmo.LoadMask.show(null, Ext.getCmp('places_map').el);

      storeFilter.set('search_scope', final_scope);
      storeFilter.filter(function() {
          Tmo.LoadMask.hide();
          if(App.mapListObserver)
          {
            App.mapListObserver.offset = 0;
            Ext.getCmp('places_card').renderPlacesOnMap();
          }
          Ext.getCmp('places_card').onPlacesBarUpdateBar();
          App.viewport.doLayout();
      });

//      Ext.getCmp('places_card').togglePlaceBar(false);

      App.viewport.doLayout();
    },

    renderPlacesOnMap: function(){
        var places_card = Ext.getCmp('places_card');
        var places_map = Ext.getCmp('places_map');
        var places_list = Ext.getCmp('places_list');

        if (!App.mapListObserver) {
            App.mapListObserver = new MapListObserver( places_card, places_map, places_list );
        }

        App.mapListObserver.renderMarkers();
    },

    onViewChangeAction: function()
    {
        var places_card = Ext.getCmp('places_card');
        var places_map = Ext.getCmp('places_map');
        var places_content = Ext.getCmp('places_content');

        if (this.search_view == "map")
        {
            places_card.renderPlacesOnMap();

            places_content.hide();
            places_map.show();
            places_card.onPlacesBarUpdateBar();
        }
        else if (this.search_view == "list")
        {
            MapListObserver.hideInfoWindows();
            places_content.show();
            places_map.hide();
            places_card.onPlacesBarUpdateBar();
        }

        App.viewport.doLayout();
    },

    onPlaceBarUpdateOffset: function()
    {
        if ( App.mapListObserver.navigateToSpotByOffset(this.placeOffset) ) {
            Ext.getCmp('places_card').onPlacesBarUpdateBar();
        }
    },

    showPlacesBar: function()
    {
        var bar = Ext.getCmp('places_bar');
        var is_empty = App.mapListObserver ? App.mapListObserver.isEmpty() : true;
        var visible = bar.isVisible();
        var is_map_view = Ext.getCmp('places_map').isVisible();

        if ( !visible && is_map_view && !is_empty ) {
            this.togglePlaceBar(true);
        }
        else if( visible && !is_map_view )
        {
            this.togglePlaceBar(false);
        }

        return bar.isVisible();
    },

    togglePlaceBar: function(visible)
    {
        var bar = Ext.getCmp('places_bar');
        var me = Ext.getCmp('places_card');

        if( visible) {
            bar.setVisible(true);
            me.addDocked(bar,5);
        } else {
            bar.setVisible(false);
            me.removeDocked(bar,false);
        }
        me.doComponentLayout();
    },

    onPlacesBarUpdateBar: function()
    {
        if ( !this.showPlacesBar() )
            return false;

        var bar = Ext.getCmp('places_bar');
        var place = App.mapListObserver.getCurrentSpot();
        if (place) {
            bar.setTitle( Ext.util.Format.ellipsis(place.get('name'), 20) );

            var list = App.mapListObserver.list;
            var last = list.store.data.length - 1;
            var index = list.indexOf(place);

            if (index == 0) {
                bar.items.first().hide();
            } else {
                bar.items.first().show();
            }

            if (index == last) {
                bar.items.last().hide();
            } else {
                bar.items.last().show();
            }
        }

        if (!Ext.isEmpty(App.mapListObserver.markers)) {
            google.maps.event.trigger(App.mapListObserver.markers[index], 'click');
        } else {
            bar.setTitle( I18n.t('place.actions.index.no_results') );
            bar.items.first().hide();
            bar.items.last().hide();
        }
        return true;
    }
    
});

Ext.reg('PlacesIndex', App.views.PlacesIndex);
