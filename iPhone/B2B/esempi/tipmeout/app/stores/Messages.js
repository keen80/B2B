App.stores.messages = new Ext.data.EnhancedStore({
    model: 'Message',    
    autoLoad: false,
    autoSync: false,
    remoteFilter: true, //allow server to filter data
    remoteSort: true, //sort data on server side
    pageSize: 25,
    currentPage: 1,
    clearOnPageLoad: false,
    proxy: {
        type: 'railsrest',
        url: Server.apiUrl("/notifications/messages"),
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
});


