
var userStoreConfig = {
    model: 'User',
    autoLoad: false,
    autoSync: false,
    remoteFilter: true, //allow server to filter data
    remoteSort: true, //sort data on server side
    pageSize: 25,
    currentPage: 1,
    clearOnPageLoad: false,
    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/networks"),
        format: 'json',
        reader: {
            type: 'json',
            root: 'records',
            totalProperty: 'count'
        },
        writer: {
            type: 'json'
        }
    },
    sorters: [
        {
            property : 'id',
            direction: 'ASC'
        }
    ]
};

App.stores.users = new Ext.data.EnhancedStore(userStoreConfig);

Tmo.storeFilters.users = new StoreFilter(App.stores.users, "users", { search_scope: 'my', search_query: '' });
App.stores.users.on('load', function(store, records, successful) {
    if (successful) {
        Tmo.storeFilters.users.dirty = false;
    }
});

Tmo.storeFilters.exploreUsers = new StoreFilter(App.stores.users, "exploreUsers", { search_scope: 'all', search_query: '' });

App.stores.peopleNetwork = new Ext.data.EnhancedStore(userStoreConfig);

Tmo.storeFilters.peopleNetwork = new StoreFilter(App.stores.peopleNetwork, "peopleNetwork", { search_scope: 'my', search_query: '' });
App.stores.peopleNetwork.on('load', function(store, records, successful) {
    if (successful) {
        Tmo.storeFilters.peopleNetwork.dirty = false;
        var users_map = Ext.getCmp('users_map');
        if (users_map && App.mapListObserver) {
          App.mapListObserver.renderMarkers({
            setCenter: !_.include( Tmo.storeFilters.users.properties, "check_in_lat" )  //!Tmo.myLocationMarker.hasMarker('places_map')
          });
        }
    }
});