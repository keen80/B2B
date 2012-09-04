App.stores.places = new Ext.data.EnhancedStore({
    model: 'Place',
    autoLoad: false,
    autoSync: false,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 25,
    clearOnPageLoad: false,

    getGroupString : function(record) {
        if(record.get('is_gp'))
        {
            return I18n.t('place.actions.index.powered_by_google');
        }
        else
        {
            return "hidden";
        }
    },

    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/places"),
        format: 'json',
        reader: {
            type: 'json',
            root: 'records',
            totalProperty: 'count'
        },
        writer: {
            type: 'json'
        }
    }

    /*
    proxy: {
        type: 'webdb',
        dbName: 'TMOMainDB1',
        dbDescription: 'TMOMainDB1',
        dbTable: 'places',
        pkField: 'id'
    }
    */
});

Tmo.storeFilters.places = new StoreFilter(App.stores.places, "places", { search_scope: 'user', search_query: '', my_network: false });
Tmo.storeFilters.eventPlaces = new StoreFilter(App.stores.places, "eventPlaces", { search_scope: 'user', search_query: '' });
Tmo.storeFilters.networkPlaces = new StoreFilter(App.stores.places, "networkPlaces", { search_scope: 'public', search_query: '', my_network: true });
Tmo.storeFilters.explorePlaces = new StoreFilter(App.stores.places, "explorePlaces", { search_scope: 'all', search_query: ''});

App.stores.places.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.places.dirty = false;
    Tmo.storeFilters.eventPlaces.dirty = false;
    Tmo.storeFilters.networkPlaces.dirty = false;
    Tmo.storeFilters.explorePlaces.dirty = false;

    /*
    var places_map = Ext.getCmp('places_map');
    if (places_map && App.mapListObserver) {
      App.mapListObserver.renderMarkers({
        setCenter: !_.include( Tmo.storeFilters.places.properties, "lat" )  //!Tmo.myLocationMarker.hasMarker('places_map')
      });
    }
    */
  }
});
