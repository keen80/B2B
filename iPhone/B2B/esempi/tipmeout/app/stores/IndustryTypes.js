App.stores.industry_types = new Ext.data.EnhancedStore({
    model: 'UserDetail::IndustryType',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      extraParams: { type: 'UserDetail::IndustryType' },
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
