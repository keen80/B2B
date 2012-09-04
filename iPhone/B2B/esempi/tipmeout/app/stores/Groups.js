App.stores.groups = new Ext.data.EnhancedStore({
    model: 'Group',
    requireUser: true,
    preventCleaning: true,
    autoLoad: false,
    autoSync: false,
    remoteFilter: true,
    remoteSort: true,
    clearOnPageLoad: false,
    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/groups"),
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
