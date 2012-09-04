App.stores.tips = new Ext.data.EnhancedStore({
    model: 'Tip',
    autoLoad: false,
    autoSync: false,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 25,
    clearOnPageLoad: false,
    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/tips"),
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

Tmo.storeFilters.tips = new StoreFilter(App.stores.tips, "tips", { search_scope: 'recent', search_query: '' });

App.stores.tips.on('load', function(store, records, successful) {
    if (successful) {
        Tmo.storeFilters.tips.dirty = false;
    }
});
