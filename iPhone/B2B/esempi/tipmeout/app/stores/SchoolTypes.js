App.stores.school_types = new Ext.data.EnhancedStore({
    model: 'UserDetail::SchoolType',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      extraParams: { type: 'UserDetail::SchoolType' },
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
