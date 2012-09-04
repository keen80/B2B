App.stores.user_details = new Ext.data.EnhancedStore({
  model: 'UserDetail',
  autoLoad: false,
  autoSync: false,
  remoteFilter: true,
  remoteSort: true,
  clearOnPageLoad: false,
    proxy: {
      type: 'railsrest',
      url: Server.apiUrl("/user_details"),
      format: 'json',
      reader: {
        type: 'json',
        root: 'records'
      },
    writer: {
      type: 'json'
    }
    }       
});

Tmo.storeFilters.user_details = new StoreFilter(App.stores.user_details, "user_details", { user_id: (Profile.getCurrentUser() ? Profile.getCurrentUser().getId() : null),
                                                                                           type: null });

App.stores.user_details.on('load', function(store,records,successful) {
  if (successful) {
    Tmo.storeFilters.user_details.dirty = false;
  }
});
