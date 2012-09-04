App.stores.place_budgets = new Ext.data.EnhancedStore({
    model: 'PlaceBudget',
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/object_categories"),
      format: 'json',
      extraParams: { type: 'PlaceBudget' },
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
