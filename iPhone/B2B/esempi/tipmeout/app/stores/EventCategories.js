App.stores.event_categories = new Ext.data.EnhancedStore({
    model: 'EventCategory',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      extraParams: { type: 'EventCategory' },
      reader: {
        type: 'json',
        root: 'records',
        totalProperty: 'count'
      },
      writer: {
        type: 'json'
      }
    },
    remoteFilter: false,
    preventCleaning: true,
    autoLoad: false
});
