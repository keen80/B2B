App.stores.pictures = new Ext.data.EnhancedStore({
    model: 'Picture',
    autoLoad: false,
    autoSync: false,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 25,
    clearOnPageLoad: false,
    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/pictures"),
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
});

Tmo.storeFilters.pictures = new StoreFilter(App.stores.pictures, "pictures", { network_scope: 'members' });

App.stores.pictures.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.pictures.dirty = false;
  }
});
